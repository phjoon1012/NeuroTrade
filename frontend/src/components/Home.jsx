import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const generateTimeLabels = () => {
  let labels = [];
  for (let hour = 0; hour <= 12; hour++) {
    let time = hour === 0 ? "12 AM" : hour === 12 ? "12 PM" : `${hour} AM`;
    labels.push(time);
  }
  return labels;
};

const Home = () => {
  const [btcPrice, setBtcPrice] = useState(null);
  const [priceData, setPriceData] = useState(Array(13).fill(null)); // 13 slots (12 AM - 12 PM)
  const [currentDate, setCurrentDate] = useState("");


  const timeLabels = generateTimeLabels(); // Fixed X-Axis Labels

  useEffect(() => {
    // Automatically update MM/DD format
    const today = new Date();
    const month = today.getMonth() + 1; // getMonth() is 0-based
    const day = today.getDate();
    setCurrentDate(`${month}/${day}`);

    // Fetch BTC price
    const fetchHistoricalData = async () => {
      const now = new Date();
      try {
        const response = await axios.get(
          "https://api.upbit.com/v1/candles/minutes/60",
          {
            params: {
              market: "KRW-BTC",
              count: now.getHours() + 1,
            },
          }
        );

        let newData = Array(13).fill(null);
        response.data.forEach((candle) => {
          let hour = new Date(candle.candle_date_time_kst).getHours();
          newData[hour] = candle.trade_price;
        });

        setPriceData(newData);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();

    // WebSocket for live price updates
    const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = () => {
      const message = [
        { ticket: "test" },
        { type: "ticker", codes: ["KRW-BTC"], isOnlyRealtime: false },
      ];
      socket.send(JSON.stringify(message));
    };

    socket.onmessage = async (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result);
        const price = data.trade_price;
        setBtcPrice(price);

        let now = new Date();
        let hour = now.getHours();
        if (hour > 12) return;

        setPriceData((prev) => {
          let newData = [...prev];
          newData[hour] = price;
          return newData;
        });
      };
      reader.readAsText(event.data);
    };

    return () => socket.close();
  }, []);

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "BTC/KRW (12AM - 12PM)",
        data: priceData,
        fill: false,
        borderColor: "#f0b90b",
        backgroundColor: "rgba(240, 185, 11, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: "#fff" } },
      y: {
        ticks: { color: "#fff" },
        suggestedMin: Math.min(...priceData.filter((p) => p)) * 0.99,
        suggestedMax: Math.max(...priceData.filter((p) => p)) * 1.01,
      },
    },
  };

  return (
    <div className="home">
      <h2>{currentDate} 비트코인 가격</h2>
      <p>비트코인 현재가 : {btcPrice ? `₩ ${btcPrice.toLocaleString()}` : "로딩 중..."}</p>

      <div className="chart-container">
        <Line data={chartData} options={chartOptions} height={500} />
      </div>
    </div>
  );
};

export default Home;