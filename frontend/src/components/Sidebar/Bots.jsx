import React, { useState } from "react";
import "./Bots.css";

const Bots = () => {
  // Bot data with additional statistics
  const bots = [
    {
      id: 1,
      name: "평균 회귀",
      description: "과매도 시 매수하고 과매수 시 매도하여 수익을 창출합니다.",
      premium: false,
      winRate: "65%",
      userCount: 150,
      cumulativeProfit: "$12,500",
      avgtradingrate: "4hrs",
      totaltradevolume: "110000",
    },
    {
      id: 2,
      name: "모멘텀",
      description: "상승 또는 하락 추세가 강한 자산을 거래합니다.",
      premium: false,
      winRate: "72%",
      userCount: 200,
      cumulativeProfit: "$15,300",
      avgtradingrate: "4hrs",
      totaltradevolume: "110000",
    },
    {
      id: 3,
      name: "돌파",
      description: "주요 수준을 초과하는 시장 움직임에서 이익을 포착합니다.",
      premium: false,
      winRate: "58%",
      userCount: 120,
      cumulativeProfit: "$8,700",
      avgtradingrate: "4hrs",
      totaltradevolume: "110000",
    },
    // {
    //   id: 4,
    //   name: "차익 거래",
    //   description: "거래소 간의 가격 차이를 이용하여 무위험 수익을 창출합니다.",
    //   premium: false,
    //   winRate: "80%",
    //   userCount: 300,
    //   cumulativeProfit: "$20,000",
    // },
    {
      id: 5,
      name: "AI 기반 차익거래",
      description: "AI로 실시간 거래소 간 가격 차이를 포착하여 무위험 수익을 창출합니다.",
      premium: true,
      winRate: "90%",
      userCount: 500,
      cumulativeProfit: "$50,000",
      avgtradingrate: "4hrs",
      totaltradevolume: "110000",
    },
    {
      id: 6,
      name: "퀀텀 모멘텀",
      description: "퀀텀 알고리즘으로 시장 추세를 정확히 파악하여 높은 수익을 제공합니다.",
      premium: true,
      winRate: "92%",
      userCount: 600,
      cumulativeProfit: "$60,000",
      avgtradingrate: "4hrs",
      totaltradevolume: "110000",
    },
    {
      id: 7,
      name: "스마트그리드 트레이딩",
      description: "시장 범위 내 최적의 매수·매도 지점을 예측해 안정적인 수익을 제공합니다.",
      premium: true,
      winRate: "88%",
      userCount: 450,
      cumulativeProfit: "$45,000",
      avgtradingrate: "4hrs",
      totaltradevolume: "110000",
    },
    // {
    //   id: 8,
    //   name: "다이내믹 브레이크아웃 PRO",
    //   description: "고급 알고리즘으로 주요 가격 돌파를 예측하고 변동성을 활용합니다.",
    //   premium: true,
    //   winRate: "85%",
    //   userCount: 400,
    //   cumulativeProfit: "$40,000",
    //   avgtradingrate: "4hrs",
    //   totaltradevolume: "110000",
    // },
  ];

  const [selectedBotId, setSelectedBotId] = useState(null); // Track selected bot ID
  const [isSubscribed, setIsSubscribed] = useState(false); // Check if the user is subscribed

  const handleSelectBot = (bot) => {
    if (bot.premium && !isSubscribed) {
      alert("이 전략을 사용하려면 구독이 필요합니다!");
    } else {
      setSelectedBotId(bot.id); // Set the selected bot ID
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
    alert("구독이 완료되었습니다! 이제 프리미엄 전략을 사용할 수 있습니다.");
  };

  return (
    <div className="bots">
      <h2>트레이딩 전략</h2>

      <div className="bot-cards">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className={`bot-card ${bot.premium ? "premium" : ""} ${
              selectedBotId === bot.id ? "selected" : ""
            }`}
            onClick={() => handleSelectBot(bot)}
          >
            <h3>{bot.name}</h3>
            <p>{bot.description}</p>
            <div className="bot-stats">
              <p>
                <strong>승률:</strong> {bot.winRate}
              </p>
              <p>
                <strong>유저 수:</strong> {bot.userCount}명
              </p>
              <p>
                <strong>누적 수익:</strong> {bot.cumulativeProfit}
              </p>
              <p>
                <strong>평균 거래 빈도:</strong> {bot.avgtradingrate}
              </p>
              <p>
                <strong>누적 거래량:</strong> {bot.totaltradevolume}
              </p>
            </div>
            {bot.premium && !isSubscribed && (
              <div className="locked-overlay">
                <p>🔒 잠금 해제하려면 구독하세요</p>
              </div>
            )}
            {/* Indicate selected bot */}
            {selectedBotId === bot.id && <p className="selected-indicator">선택됨</p>}
          </div>
        ))}
      </div>

      {/* Subscription Section */}
      {!isSubscribed && (
        <div className="subscribe">
          <h3>프리미엄 전략을 잠금 해제하려면 구독하세요</h3>
          <button onClick={handleSubscribe}>구독하기</button>
        </div>
      )}
    </div>
  );
};

export default Bots;