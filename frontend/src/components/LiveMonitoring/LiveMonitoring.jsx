import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../LandingPage/Header";
import "./LiveMonitoring.css";
import CandlestickChart from "../LandingPage/ChartComponent";

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

  return (
    <>
      <Header />
      <div className="live-monitoring">
        <h2 className="monitoring-title">실시간 모니터링</h2>

        {/* ✅ Chart Section */}
        {/* <div className="chart-section"> */}
          <div className="chart-container">
            <CandlestickChart />
          </div>
        {/* </div> */}

        {/* ✅ Strategies Section */}
        <div className="strategies-section">
          <h2 className="monitoring-title">활성화된 전략</h2>
          {strategies.length > 0 ? (
            <div className="strategy-grid">
              {strategies.map((strategy, index) => (
                <div key={index} className="strategy-card">
                  <div className="strategy-header">
                  <h4>{strategy.bot__name}</h4>
                  </div>
                    <div className="status-container">
                      <span className={`status-badge ${strategy.is_active ? 'inactive' : 'active'}`}>
                        {strategy.is_active ? "비활성화됨" : "모니터링 중"} <span className="dots"></span>
                      </span>
                    </div> 
                  
                  <div className="strategy-details">
                    <p><strong>승률:</strong> {strategy.win_rate}%</p>
                    <p><strong>총 거래량:</strong> {strategy.total_trade_volume} KRW</p>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${strategy.win_rate}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-strategies">활성화된 전략이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LiveMonitoring;