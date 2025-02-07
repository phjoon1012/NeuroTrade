import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../LandingPage/Header";  // Navbar
import "./Strategies.css";  // Ensure consistent styling

const Strategies = () => {
    const [strategies, setStrategies] = useState([]);
  
    useEffect(() => {
      const fetchStrategies = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/strategies/");
          console.log("Received strategies:", response.data);  // Debug: Check API response

          setStrategies(response.data);
        } catch (error) {
          console.error("Error fetching strategies:", error);
        }
      };
  
      fetchStrategies();
    }, []);
  
    return (
      <div className="strategies">
        <Header />
        <h2>트레이딩 전략</h2>
        <div className="strategy-cards">
          {strategies.map((strategy, index) => (
            <div key={index} className="strategy-card">
              <h3>{strategy.bot__name}</h3>
              <p><strong>총 거래 수:</strong> {strategy.total_trades}</p>
              <p><strong>승률:</strong> {strategy.win_rate}%</p>
              <p><strong>평균 거래 빈도:</strong> {strategy.avg_trading_rate}</p>
              <p><strong>총 거래량:</strong> {strategy.total_trade_volume}</p>
              <p><strong>사용자 수:</strong> {strategy.number_of_users}</p>
              <p><strong>업데이트 날짜:</strong> {new Date(strategy.updated_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Strategies;