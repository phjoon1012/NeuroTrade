import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./Backtesting.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Backtesting = () => {
  // Backtesting data for each bot
    const botBacktestingData = [
    {
      id: 1,
      name: "평균 회귀",
      description: "과매도 시 매수하고 과매수 시 매도하여 수익을 창출합니다.",
      premium: false,
      totalTrades: 250,
      winRate: 68,
      maxDrawdown: 7,
      profitFactor: 1.8,
      netProfit: "$18,700",
      performance: [10000, 11000, 11500, 12000, 12800, 13500],
    },
    {
      id: 2,
      name: "모멘텀",
      description: "상승 또는 하락 추세가 강한 자산을 거래합니다.",
      premium: false,
      totalTrades: 300,
      winRate: 75,
      maxDrawdown: 6,
      profitFactor: 2.2,
      netProfit: "$25,400",
      performance: [12000, 12500, 13500, 14500, 16000, 17500],
    },
    {
      id: 3,
      name: "돌파",
      description: "주요 수준을 초과하는 시장 움직임에서 이익을 포착합니다.",
      premium: false,
      totalTrades: 180,
      winRate: 62,
      maxDrawdown: 9,
      profitFactor: 1.4,
      netProfit: "$12,300",
      performance: [9000, 9400, 9600, 10000, 10400, 11000],
    },
    // {
    //   id: 4,
    //   name: "차익 거래",
    //   description: "거래소 간의 가격 차이를 이용하여 무위험 수익을 창출합니다.",
    //   premium: false,
    //   totalTrades: 350,
    //   winRate: 85,
    //   maxDrawdown: 3,
    //   profitFactor: 3.5,
    //   netProfit: "$32,000",
    //   performance: [16000, 17000, 18500, 20000, 22000, 25000],
    // },
    {
      id: 5,
      name: "AI 기반 차익거래",
      description: "AI로 실시간 거래소 간 가격 차이를 포착하여 무위험 수익을 창출합니다.",
      premium: true,
      totalTrades: 550,
      winRate: 93,
      maxDrawdown: 1,
      profitFactor: 5.8,
      netProfit: "$72,000",
      performance: [25000, 27000, 30000, 34000, 40000, 45000],
    },
    {
      id: 6,
      name: "퀀텀 모멘텀",
      description: "퀀텀 알고리즘으로 시장 추세를 정확히 파악하여 높은 수익을 제공합니다.",
      premium: true,
      totalTrades: 600,
      winRate: 94,
      maxDrawdown: 1,
      profitFactor: 6.5,
      netProfit: "$85,000",
      performance: [30000, 33000, 37000, 42000, 49000, 57000],
    },
    {
      id: 7,
      name: "스마트 그리드 트레이딩",
      description: "시장 범위 내 최적의 매수·매도 지점을 예측해 안정적인 수익을 제공합니다",
      premium: true,
      totalTrades: 580,
      winRate: 91,
      maxDrawdown: 2,
      profitFactor: 6.0,
      netProfit: "$78,500",
      performance: [28000, 31000, 35000, 40000, 46000, 52000],
    },
    // {
    //   id: 8,
    //   name: "다이나믹 브레이크아웃 Pro",
    //   description: "고급 알고리즘으로 주요 가격 돌파를 예측하고 변동성을 활용합니다.",
    //   premium: true,
    //   totalTrades: 610,
    //   winRate: 92,
    //   maxDrawdown: 1,
    //   profitFactor: 6.7,
    //   netProfit: "$88,000",
    //   performance: [32000, 36000, 41000, 47000, 54000, 62000],
    // },
  ];

  const [selectedBot, setSelectedBot] = useState(botBacktestingData[0]); // Default to the first bot

  return (
    <div className="backtesting">
      <h2>백테스팅 데이터</h2>

      <div className="bot-cards">
        {botBacktestingData.map((bot) => (
          <div
            key={bot.id}
            className={`bot-card ${bot.premium ? "premium" : ""}`}
            onClick={() => setSelectedBot(bot)}
          >
            <h3>{bot.name}</h3>
            <p>{bot.description}</p>
            <Line
              data={{
                labels: ["1개월", "2개월", "3개월", "4개월", "5개월", "6개월"],
                datasets: [
                  {
                    label: "성과 ($)",
                    data: bot.performance,
                    borderColor: bot.premium ? "#ffd700" : "#f0b90b", // Gold for premium
                    backgroundColor: bot.premium
                      ? "rgba(255, 215, 0, 0.2)" // Gold for premium
                      : "rgba(240, 185, 11, 0.2)",
                    tension: 0.4,
                    fill: true,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: true },
                },
                scales: {
                  x: {
                    ticks: { color: "#fff" },
                  },
                  y: {
                    ticks: { color: "#fff" },
                  },
                },
              }}
              height={100}
            />
            {bot.premium && <p className="premium-badge">프리미엄</p>}
          </div>
        ))}
      </div>

      <div className="bot-backtesting">
        <h3>{selectedBot.name} - 백테스팅 상세 정보</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>총 거래 수:</strong></td>
              <td>{selectedBot.totalTrades}</td>
            </tr>
            <tr>
              <td><strong>승률:</strong></td>
              <td>{selectedBot.winRate}%</td>
            </tr>
            <tr>
              <td><strong>최대 낙폭:</strong></td>
              <td>{selectedBot.maxDrawdown}%</td>
            </tr>
            <tr>
              <td><strong>수익 요인:</strong></td>
              <td>{selectedBot.profitFactor}</td>
            </tr>
            <tr>
              <td><strong>순이익:</strong></td>
              <td>{selectedBot.netProfit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Backtesting;