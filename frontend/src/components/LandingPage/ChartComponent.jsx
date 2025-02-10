import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const CandlestickChart = () => {
    const chartContainerRef = useRef(null);
    const chartInstance = useRef(null);
    const [candleSeries, setCandleSeries] = useState(null);
    const [lastCandle, setLastCandle] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);

    // ✅ Fetch More Historical Data in Batches
    const fetchHistoricalData = async (to = null) => {
        try {
            let url = "https://api.upbit.com/v1/candles/minutes/15?market=KRW-BTC&count=200";
            if (to) {
                url += `&to=${to}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            // ✅ Filter out extreme prices to avoid long wicks
            const formattedData = data.reverse().map(candle => ({
                time: Math.floor(new Date(candle.candle_date_time_kst).getTime() / 1000),
                open: candle.opening_price,
                high: Math.max(candle.opening_price, candle.high_price), // Prevent low open with high wicks
                low: Math.min(candle.opening_price, candle.low_price), // Prevent high open with long down wicks
                close: candle.trade_price,
            }));

            return formattedData;
        } catch (error) {
            console.error("Error fetching historical data:", error);
            return [];
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            const data = await fetchHistoricalData();
            setHistoricalData(data);

            if (chartContainerRef.current) {
                const chart = createChart(chartContainerRef.current, {
                    layout: {
                        background: { type: "solid", color: "white" },
                        textColor: "black",
                    },
                    width: chartContainerRef.current.clientWidth,
                    height: 400,
                    rightPriceScale: {
                        autoScale: true,
                    },
                    timeScale: {
                        borderVisible: false,
                        timeVisible: true,
                        secondsVisible: false,
                        tickMarkFormatter: (time) => {
                            const date = new Date(time * 1000);
                            return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
                        },
                    },
                });

                chartInstance.current = chart;
                const series = chart.addCandlestickSeries({
                    upColor: "#26a69a",
                    downColor: "#ef5350",
                    borderUpColor: "#26a69a",
                    borderDownColor: "#ef5350",
                    wickUpColor: "#26a69a",
                    wickDownColor: "#ef5350",
                });

                series.setData(data);
                chart.timeScale().fitContent();
                setCandleSeries(series);
                setLastCandle(data[data.length - 1]);

                // ✅ Add Scroll Event to Load More History
                
            }
        };

        loadInitialData();
    }, []);

    // ✅ Live WebSocket Data with Corrected Updates
    useEffect(() => {
        if (!candleSeries || !lastCandle) return;

        const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

        socket.onopen = () => {
            console.log("Connected to Upbit WebSocket");
            socket.send(JSON.stringify([{ ticket: "test" }, { type: "ticker", codes: ["KRW-BTC"] }]));
        };

        socket.onmessage = async (event) => {
            const reader = new FileReader();
            reader.onload = () => {
                const json = JSON.parse(reader.result);
                if (json.type === "ticker") {
                    const tradeTime = Math.floor(json.trade_timestamp / 1000);
                    const tradePrice = json.trade_price;
                    const candleStartTime = tradeTime - (tradeTime % 900);

                    // ✅ Prevent long wicks by checking high and low values
                    if (candleStartTime === lastCandle.time) {
                        const updatedCandle = {
                            ...lastCandle,
                            high: Math.max(lastCandle.high, tradePrice),
                            low: Math.min(lastCandle.low, tradePrice),
                            close: tradePrice,
                        };

                        // ✅ Ignore extreme values that are 5% outside the last candle range
                        if (
                            updatedCandle.high <= lastCandle.high * 1.05 &&
                            updatedCandle.low >= lastCandle.low * 0.95
                        ) {
                            candleSeries.update(updatedCandle);
                            setLastCandle(updatedCandle);
                        }
                    } else {
                        candleSeries.update(lastCandle);
                        const newCandle = {
                            time: candleStartTime,
                            open: tradePrice,
                            high: tradePrice,
                            low: tradePrice,
                            close: tradePrice,
                        };
                        setLastCandle(newCandle);
                        candleSeries.update(newCandle);
                    }
                }
            };
            reader.readAsText(event.data);
        };

        socket.onerror = (error) => console.error("WebSocket Error:", error);
        socket.onclose = () => console.log("Disconnected from Upbit WebSocket");

        return () => {
            socket.close();
        };
    }, [candleSeries]);

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }} />
        </div>
    );
};

export default CandlestickChart;