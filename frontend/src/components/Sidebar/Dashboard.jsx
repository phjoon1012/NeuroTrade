import React from "react";
import { Line } from "react-chartjs-2";
import "./Dashboard.css";


const Dashboard = () => {
  const portfolioValue = "$13,500";
  const portfolioChange = "+8.0%";
  const strategyReturns = [
    { name: "Mean Reversion", return: "12.5%" },
    { name: "Momentum", return: "15.3%" },
    { name: "Breakout", return: "10.8%" },
  ];
  const winRate = 65;
  const lossRate = 35;

  const recentTrades = [
    { date: "2025-01-23 10:45", asset: "BTC", type: "Buy", qty: "0.01", price: "$23,000", pnl: "+$50" },
    { date: "2025-01-23 09:30", asset: "ETH", type: "Sell", qty: "0.5", price: "$1,600", pnl: "-$10" },
    { date: "2025-01-22 17:15", asset: "BNB", type: "Buy", qty: "2", price: "$300", pnl: "+$20" },
  ];

  const portfolioPerformanceData = {
    labels: ["Jan 1", "Jan 5", "Jan 10", "Jan 15", "Jan 20", "Jan 23"],
    datasets: [
      {
        label: "Portfolio Value ($)",
        data: [12000, 12300, 12800, 12500, 13200, 13500],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  const portfolioPerformanceOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: "#fff" } },
      y: { ticks: { color: "#fff" } },
    },
  };

  
  return (
    <div className="dashboard">
      <h2>대쉬보드</h2>
      <div className="stats-container">
        {/* Portfolio Value Card */}
        <div className="stats-card">
          <h3>잔고</h3>
          <p className="value">{portfolioValue}</p>
          <p className="change positive">Change: {portfolioChange}</p>
        </div>

        {/* Strategy Returns */}
        <div className="stats-card">
          <h3>전략 수익률</h3>
          <ul className="strategy-list">
            {strategyReturns.map((strategy, index) => (
              <li key={index}>
                <span className="strategy-name">{strategy.name}</span>
                <span className="strategy-return">{strategy.return}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Win/Loss Ratio */}
        <div className="stats-card">
          <h3>승패 비율</h3>
          <div className="ratio-container">
            <div className="ratio win" style={{ width: `${winRate}%` }}>
              승: {winRate}%
            </div>
            <div className="ratio loss" style={{ width: `${lossRate}%` }}>
              패: {lossRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Performance Chart */}
      <div className="stats-card full-width">
        <h3>포트폴리오 성과</h3>
        <Line data={portfolioPerformanceData} options={portfolioPerformanceOptions} />
      </div>

      {/* Recent Trades Table */}
      <div className="stats-card full-width">
        <h3>최근 거래</h3>
        <table className="trades-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>자산</th>
              <th>유형</th>
              <th>수량</th>
              <th>가격</th>
              <th>손익</th>
            </tr>
          </thead>
          <tbody>
            {recentTrades.map((trade, index) => (
              <tr key={index}>
                <td>{trade.date}</td>
                <td>{trade.asset}</td>
                <td>{trade.type}</td>
                <td>{trade.qty}</td>
                <td>{trade.price}</td>
                <td className={trade.pnl.startsWith("+") ? "positive" : "negative"}>{trade.pnl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;