import React, { useEffect, useState } from "react";
import { Chart as ChartJS, TimeScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";
import axios from "axios";
import "./LandingPage.css";

// Register the candlestick chart components
ChartJS.register(TimeScale, LinearScale, Tooltip, Legend, CandlestickController, CandlestickElement);

const CoinPrices = () => {
  const [coinData, setCoinData] = useState([]);
  const [candlestickData, setCandlestickData] = useState([]);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get("https://api.upbit.com/v1/ticker", {
          params: { markets: "KRW-BTC,KRW-ETH,KRW-XRP,KRW-USDT" },
        });

        const data = response.data.map((coin) => ({
          name: mapCoinName(coin.market),
          price: `${coin.trade_price.toLocaleString()} KRW`,
          change: (coin.signed_change_rate * 100).toFixed(2) + "%",
        }));

        setCoinData(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    const fetchCandlestickData = async () => {
      try {
        const response = await axios.get("https://api.upbit.com/v1/candles/days", {
          params: { market: "KRW-BTC", count: 30 },
        });

        const candles = response.data.map((candle) => ({
          x: new Date(candle.candle_date_time_kst),
          o: candle.opening_price,
          h: candle.high_price,
          l: candle.low_price,
          c: candle.trade_price,
        }));

        setCandlestickData(candles);
      } catch (error) {
        console.error("Error fetching candlestick data:", error);
      }
    };

    fetchCoinData();
    fetchCandlestickData();
  }, []);

  const mapCoinName = (market) => {
    switch (market) {
      case "KRW-BTC":
        return "비트코인";
      case "KRW-ETH":
        return "이더리움";
      case "KRW-XRP":
        return "리플";
      case "KRW-USDT":
        return "테더";
      default:
        return market;
    }
  };

  const candlestickOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { type: "time", time: { unit: "day" }, ticks: { color: "#333" } },
      y: { ticks: { color: "#333" } },
    },
  };

  const candlestickChartData = {
    datasets: [
      {
        label: "BTC/KRW",
        data: candlestickData,
        borderColor: "#4caf50",
        backgroundColor: "#4caf50",
        color: {
          up: "#4caf50",
          down: "#f44336",
          unchanged: "#999",
        },
      },
    ],
  };

  return (
    <section className="coin-prices">
      <h2>코인 시세</h2>
      <table>
        <thead>
          <tr>
            <th>코인</th>
            <th>가격</th>
            <th>변동률</th>
          </tr>
        </thead>
        <tbody>
          {coinData.map((coin, index) => (
            <tr key={index}>
              <td>{coin.name}</td>
              <td>{coin.price}</td>
              <td className={coin.change.includes("-") ? "negative" : "positive"}>
                {coin.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Candlestick Chart */}
      <div className="chart-container">
        <Chart type="candlestick" data={candlestickChartData} options={candlestickOptions} />
      </div>
    </section>
  );
};

export default CoinPrices;