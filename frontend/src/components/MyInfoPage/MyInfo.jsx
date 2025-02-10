// src/components/MyInfo.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../LandingPage/Header";
import "./MyInfo.css";
import { getUpbitBalance, fetchTradeHistory } from "../../api/dashboardApi";
import { Pie, Line } from "react-chartjs-2"; // ✅ Import Charts
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

// ✅ Register required chart components
Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

const MyInfo = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/profile/", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        setError("사용자 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const loadTradeHistory = async () => {
      const tradeData = await fetchTradeHistory();
      setTrades(tradeData);
    };

    loadTradeHistory();
  }, []);

  useEffect(() => {
    if (user?.api_key && user?.api_secret) {
      getUpbitBalance().then(setBalance);
    }
  }, [user]);

  // ✅ Create Pie Chart Data for Upbit Balance
  const pieChartData = {
    labels: balance.map(asset => asset.currency),
    datasets: [
      {
        data: balance.map(asset => parseFloat(asset.balance)),
        backgroundColor: ["#1b5fc6", "#ff9f40", "#ff6384", "#36a2eb", "#4bc0c0"],
        hoverOffset: 10,
      },
    ],
  };

  // ✅ Create Line Chart Data for Profit & Loss Trend
  const lineChartData = {
    labels: trades.map(trade => new Date(trade.trade_time).toLocaleDateString()).slice(-10), // Last 10 trades
    datasets: [
      {
        label: "손익 추이",
        data: trades.map(trade => trade.profit_loss).slice(-10), // Last 10 trades' profit/loss
        borderColor: "#1b5fc6",
        backgroundColor: "rgba(27, 95, 198, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <Header />
      <div className="dashboard">
        {loading ? (
          <p className="loading">로딩 중...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <h2 className="dashboard-title">대시보드</h2>

            {/* ✅ GRID-BASED DASHBOARD */}
            <div className="dashboard-grid">

              {/* ✅ User Profile Card */}
              <div className="dashboard-card profile-card">
                <h3>{user.username}</h3>
                <p><strong>이메일:</strong> {user.email}</p>
                <p><strong>가입일:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                <p><strong>API KEY:</strong> {user.api_key}</p>
                <p className={`subscription-status ${user.is_subscribed ? "active" : "inactive"}`}>
                  {user.is_subscribed ? "✅ 구독 중" : "❌ 구독 안 함"}
                </p>
              </div>

              {/* ✅ Upbit Balance - Pie Chart */}
              <div className="dashboard-card balance-card">
                <h3>UPBIT 잔고</h3>
                {balance.length > 0 ? (
                  <Pie data={pieChartData} />
                ) : (
                  <p>잔고 정보를 불러올 수 없습니다.</p>
                )}
              </div>

              {/* ✅ Profit & Loss Trend - Line Chart */}
              <div className="dashboard-card profit-chart">
                <h3>손익 추이</h3>
                {trades.length > 0 ? (
                  <Line data={lineChartData} />
                ) : (
                  <p>거래 내역이 없습니다.</p>
                )}
              </div>

              {/* ✅ Trade History Card */}
              <div className="dashboard-card trade-history-card">
                <h3>최근 거래 내역</h3>
                {trades.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>거래 시간</th>
                        <th>자산</th>
                        <th>유형</th>
                        <th>수량</th>
                        <th>가격</th>
                        <th>손익</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trades.slice(0, 5).map((trade, index) => (
                        <tr key={index}>
                          <td>{new Date(trade.trade_time).toLocaleString()}</td>
                          <td>{trade.asset}</td>
                          <td>{trade.trade_type}</td>
                          <td>{trade.amount}</td>
                          <td>${trade.price}</td>
                          <td className={trade.profit_loss >= 0 ? "positive" : "negative"}>
                            {trade.profit_loss >= 0 ? `+${trade.profit_loss}` : trade.profit_loss}
                          </td>
                          <td>{trade.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>거래 내역이 없습니다.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyInfo;