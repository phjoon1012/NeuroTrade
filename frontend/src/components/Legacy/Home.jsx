import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
} from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import { Chart } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import axios from "axios";
import { fetchUserCount } from "../../api";  // Import API function

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, TimeScale, Tooltip, CandlestickController, CandlestickElement);

const Home = () => {
  const [candlestickData, setCandlestickData] = useState([]);
  const [btcPrice, setBtcPrice] = useState(null);  // Live BTC price
  const [currentDate, setCurrentDate] = useState("");
  const [userCount, setUserCount] = useState(0);  // State to store user count

  useEffect(() => {
    // Update current date
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    setCurrentDate(`${month}/${day}`);

    // Fetch candlestick data
    const fetchCandlestickData = async () => {
      try {
        const response = await axios.get("https://api.upbit.com/v1/candles/minutes/60", {
          params: { market: "KRW-BTC", count: 12 },
        });

        const formattedData = response.data.map((candle) => ({
          x: new Date(candle.candle_date_time_kst),
          o: candle.opening_price,
          h: candle.high_price,
          l: candle.low_price,
          c: candle.trade_price,
        }));

        setCandlestickData(formattedData);
      } catch (error) {
        console.error("Error fetching candlestick data:", error);
      }
    };

    fetchCandlestickData();

    // Fetch user count from API
    const getUserCount = async () => {
      try {
        const response = await fetchUserCount();
        setUserCount(response.data.user_count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    getUserCount();

    // WebSocket for live BTC price
    const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = () => {
      const message = [
        { ticket: "live_btc_price" },
        { type: "ticker", codes: ["KRW-BTC"], isOnlyRealtime: true },
      ];
      socket.send(JSON.stringify(message));
    };

    socket.onmessage = (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result);
        const price = data.trade_price;
        setBtcPrice(price);
      };
      reader.readAsText(event.data);
    };

    return () => socket.close();  // Clean up WebSocket on unmount
  }, []);

  // Define time range from 12 AM to 12 PM for today
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);  // Set to 12:00 AM

  const endOfDay = new Date();
  endOfDay.setHours(12, 0, 0, 0);  // Set to 12:00 PM

  const chartData = {
    datasets: [
      {
        label: "BTC/KRW Candlestick",
        data: candlestickData,
        borderColor: "#14213d",  // Dark blue border
        color: {
          up: "#4caf50",      // Green for price increase
          down: "#f44336",    // Red for price decrease
          unchanged: "#999",  // Gray for unchanged prices
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "hour" },
        ticks: { color: "#000" },
        min: startOfDay,
        max: endOfDay,
      },
      y: {
        ticks: { color: "#000" },
      },
    },
  };

  return (
    <div className="home">
      <h2>{currentDate} 비트코인 캔들 차트 (BTC/KRW)</h2>
      <p>비트코인 현재가: {btcPrice ? `₩ ${btcPrice.toLocaleString()}` : "로딩 중..."}</p>

      <div className="chart-container">
        <Chart type="candlestick" data={chartData} options={chartOptions} height={500} />
      </div>

      <div className="user-count">
        <p>현재 서비스 이용자 수: {userCount}명</p>
      </div>
    </div>
  );
};

export default Home;