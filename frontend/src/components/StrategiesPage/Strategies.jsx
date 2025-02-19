import React, { useEffect, useState } from "react";
import { fetchStrategies } from "../../api/strategiesApi";
import Header from "../LandingPage/Header";
import "./Strategies.css";
import { sendSelectedStrategy } from "../../api/strategiesApi";

const Strategies = () => {
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [confirmedStrategy, setConfirmedStrategy] = useState(null);
  const [showModal, setShowModal] = useState(false); // ✅ 모달 상태 추가
  
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


  const handleSelection = (index) => {
    setSelectedStrategy((prevSelected) => (prevSelected === index ? null : index));
  };

  const handleConfirmSelection = async () => {
    if (selectedStrategy !== null) {
      const strategyToSend = strategies[selectedStrategy]
      setConfirmedStrategy(strategyToSend);
      setShowModal(true); // ✅ 선택 완료 시 모달 표시
      try {
        const response = await sendSelectedStrategy(strategyToSend);  // Send the selected strategy to the backend
        console.log("Strategy confirmed:", response);
      } catch (error) {
        console.error("Error confirming strategy:", error);
      }
    }
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
              className={`strategy-card ${selectedStrategy === index ? "selected" : ""}`}
              onClick={() => handleSelection(index)}
            >
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

        <button
          className="confirm-button"
          onClick={handleConfirmSelection}
          disabled={selectedStrategy === null}
        >
          선택 완료
        </button>

        {/* ✅ 모달 창 */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>✅ 전략 선택 완료!</h3>
              <p><strong>이름:</strong> {confirmedStrategy?.bot__name}</p>
              <p><strong>설명:</strong> {confirmedStrategy?.bot__description}</p>
              <button onClick={() => setShowModal(false)}>확인</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Strategies;
