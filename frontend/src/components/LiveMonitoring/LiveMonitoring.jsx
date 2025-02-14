// src/components/LiveMonitoring.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Header from "../LandingPage/Header";
import "./LiveMonitoring.css";

const LiveMonitoring = () => {
  const [priceData, setPriceData] = useState([]);
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    // WebSocket for real-time price data
    const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = () => {
      const message = [{ ticket: "price-feed" }, { type: "ticker", codes: ["KRW-BTC"] }];
      socket.send(JSON.stringify(message));
    };

    socket.onmessage = (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result);
        setPriceData((prevData) => [...prevData.slice(-19), data.trade_price]);
      };
      reader.readAsText(event.data);
    };

    return () => socket.close();
  }, []);

  // Fetch strategies monitoring the price
  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/strategies/");
        setStrategies(response.data);
      } catch (error) {
        console.error("Error fetching strategies:", error);
      }
    };

    fetchStrategies();
  }, []);

  const chartData = {
    labels: Array(priceData.length).fill(""),
    datasets: [
      {
        label: "BTC 가격 (KRW)",
        data: priceData,
        borderColor: "#1b5fc6",
        backgroundColor: "rgba(27, 95, 198, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { ticks: { color: "#333" } },
      x: { ticks: { color: "#333" } },
    },
  };

  return (
    <div className="live-monitoring">
      <Header />
      <h2>실시간 모니터링</h2>

      <div className="monitoring-container">
        <div className="left-panel">
          <h3>BTC 실시간 가격</h3>
          <div className="price-chart">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="right-panel">
  <h3>활성화된 전략</h3>
  {strategies.length > 0 ? (
    <ul className="strategy-list">
      {strategies.map((strategy, index) => (
        <li key={index} className="strategy-item">
          <div className="strategy-info">
            <h4>{strategy.bot__name}</h4>
            <span className={`status-badge ${strategy.is_active ? 'inactive' : 'active'}`}>
              {strategy.is_active ? "비활성화됨" : "모니터링 중 ..."}
            </span>
          </div>
          <div className="strategy-details">
            <p><strong>승률:</strong> {strategy.win_rate}%</p>
            <p><strong>총 거래량:</strong> {strategy.total_trade_volume} KRW</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${strategy.win_rate}%` }}
              ></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>활성화된 전략이 없습니다.</p>
  )}
</div>
      </div>
    </div>
  );
};

export default LiveMonitoring;