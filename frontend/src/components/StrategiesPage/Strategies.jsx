import React, { useEffect, useState } from "react";
import { fetchStrategies } from "../../api/strategiesApi";
import Header from "../LandingPage/Header";
import "./Strategies.css";

const Strategies = () => {
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategies, setSelectedStrategies] = useState(new Set()); // ✅ Track selected strategies

  useEffect(() => {
    const getStrategies = async () => {
      try {
        const data = await fetchStrategies();
        setStrategies(data);
      } catch (error) {
        console.error("Error fetching strategies:", error);
      }
    };

    getStrategies();
  }, []);

  // ✅ Toggle selection when a strategy card is clicked
  const toggleSelection = (index) => {
    setSelectedStrategies((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(index)) {
        newSelected.delete(index); // Unselect if already selected
      } else {
        newSelected.add(index); // Select if not selected
      }
      return newSelected;
    });
  };

  return (
   <>
   <Header /> 
      <div className="strategies">
      <h2 className="strategy-title">트레이딩 전략</h2>
      <div className="strategy-cards">
        {strategies.map((strategy, index) => (
          <div
            key={index}
            className={`strategy-card ${selectedStrategies.has(index) ? "selected" : ""}`}
            onClick={() => toggleSelection(index)} // ✅ Make cards clickable
          >
            {selectedStrategies.has(index) && <div className="selected-label">✅ 선택됨</div>} {/* ✅ Show 선택됨 */}
            <h3>{strategy.bot__name}</h3>
            <p>{strategy.bot__description}</p>
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
   
   
   </>
      
  );
};

export default Strategies;