import React, { useEffect, useState } from "react";
import { fetchStrategies, sendSelectedStrategy, sendSubscription } from "../../api/strategiesApi";
import Header from "../LandingPage/Header";
import "./Strategies.css";

const Strategies = () => {
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [confirmedStrategy, setConfirmedStrategy] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);

  // ✅ 구독 상태 불러오기 (초기 로드 시 1번 실행)
  useEffect(() => {
    const storedSubscription = localStorage.getItem("subscribed");
    setIsSubscribed(storedSubscription === "true");
  }, []);

  // 🔹 서버에서 트레이딩 전략 목록 가져오기
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

  // 🔹 전략 선택 핸들러
  const handleSelection = (index, isPremium) => {
    if (isPremium && !isSubscribed) return; // ✅ 구독 안한 유저는 프리미엄 선택 불가
    setSelectedStrategy((prevSelected) => (prevSelected === index ? null : index));
  };

  // 🔹 선택 완료 버튼 클릭
  const handleConfirmSelection = async () => {
    if (selectedStrategy !== null) {
      const strategyToSend = strategies[selectedStrategy];
      setConfirmedStrategy(strategyToSend);
      setShowModal(true);

      try {
        await sendSelectedStrategy(strategyToSend);
      } catch (error) {
        console.error("Error confirming strategy:", error);
      }
    }
  };

  // ✅ 구독하기 버튼 클릭 (오류 해결)
  const handleSubscribe = async () => {
    try {
      await sendSubscription(true);
      setIsSubscribed(true);
      localStorage.setItem("subscribed", "true");
      setShowSubscribeModal(true);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  // ✅ 구독 취소 버튼 클릭 (오류 해결)
  const handleUnsubscribe = async () => {
    try {
      await sendSubscription(false);
      setIsSubscribed(false);
      localStorage.removeItem("subscribed");
      setShowUnsubscribeModal(true);
    } catch (error) {
      console.error("Error unsubscribing:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="strategies">
        <h2 className="strategy-title">트레이딩 전략</h2>
        <div className="strategy-cards">
          {strategies.map((strategy, index) => {
            const isPremium = strategy.bot__premium;
            const isDisabled = isPremium && !isSubscribed;

            return (
              <div
                key={index}
                className={`strategy-card ${selectedStrategy === index ? "selected" : ""} ${
                  isDisabled ? "disabled-card" : ""
                }`}
                onClick={() => handleSelection(index, isPremium)}
                style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
              >
                <h3>
                  {strategy.bot__name} {isPremium && <span className="premium-lock">🔒 (프리미엄)</span>}
                </h3>
                <p>{strategy.bot__description}</p>
                <p><strong>총 거래 수:</strong> {strategy.total_trades}</p>
                <p><strong>승률:</strong> {strategy.win_rate}%</p>
                <p><strong>평균 거래 빈도:</strong> {strategy.avg_trading_rate}</p>
                <p><strong>총 거래량:</strong> {strategy.total_trade_volume}</p>
                <p><strong>사용자 수:</strong> {strategy.number_of_users}</p>
                <p><strong>업데이트 날짜:</strong> {new Date(strategy.updated_at).toLocaleDateString()}</p>
              </div>
            );
          })}
        </div>

        <button
          className="confirm-button"
          onClick={handleConfirmSelection}
          disabled={selectedStrategy === null}
        >
          선택 완료
        </button>

        {/* ✅ 구독 / 구독 취소 버튼 */}
        {!isSubscribed ? (
          <button className="subscribe-button" onClick={handleSubscribe}>
            구독하기
          </button>
        ) : (
          <button className="unsubscribe-button" onClick={handleUnsubscribe}>
            구독 취소
          </button>
        )}
      </div>
    </>
  );
};

export default Strategies;
