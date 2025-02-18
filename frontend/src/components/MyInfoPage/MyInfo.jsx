// src/components/MyInfo.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../LandingPage/Header";  // Import navbar
import "./MyInfo.css";
<<<<<<< HEAD

const MyInfo = () => {
  const [user, setUser] = useState(null);
=======
import { getUpbitBalance, fetchTradeHistory, updateApiKeys } from "../../api/dashboardApi";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    api_key: '',
    api_secret: ''
  });
>>>>>>> feature/회원_정보_수정

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/dashboard/profile/", {
          withCredentials: true,
        });
        setUser(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

<<<<<<< HEAD
  if (!user) {
    return (
      <div>
        <Header />
        <p className="loading">로딩 중...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />  {/* Keep Navbar */}
      <div className="my-info">
        <h2>{user.username}님의 프로필</h2>
        {user.profile_picture && (
          <img src={user.profile_picture} alt="Profile" className="profile-picture" />
=======
  useEffect(() => {
    const loadTradeHistory = async () => {
      const tradeData = await fetchTradeHistory();
      setTrades(tradeData);
    };

    loadTradeHistory();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (user?.api_key) {
        try {
          const balanceData = await getUpbitBalance();
          console.log('Fetched balance:', balanceData);  // 디버깅용
          setBalance(balanceData);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, [user]);

  const handleOpenModal = () => {
    setFormData({
      api_key: user?.api_key || '',
      api_secret: user?.api_secret || ''
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateApiKeys(formData.api_key, formData.api_secret);
      setUser(response);
      handleCloseModal();
      alert("API 키가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("Error updating API keys:", error);
      alert(error.message);
    }
  };

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
                <p>
                  <strong>API KEY:</strong>
                  <span className="api-key-mask">
                    {user.api_key ? '********' : '미등록'}
                  </span>
                </p>
                <button className="edit-button" onClick={handleOpenModal}>
                  API 키 수정
                </button>
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

            {/* API Key 수정 모달 */}
            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>API 키 설정</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Upbit API Key</label>
                      <input
                        type="text"
                        name="api_key"
                        value={formData.api_key}
                        onChange={handleInputChange}
                        placeholder="업비트 API Key를 입력하세요"
                      />
                    </div>
                    <div className="form-group">
                      <label>Upbit Secret Key</label>
                      <input
                        type="password"
                        name="api_secret"
                        value={formData.api_secret}
                        onChange={handleInputChange}
                        placeholder="업비트 Secret Key를 입력하세요"
                      />
                    </div>
                    <div className="modal-buttons">
                      <button type="submit">저장</button>
                      <button type="button" onClick={handleCloseModal}>취소</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
>>>>>>> feature/회원_정보_수정
        )}
        <p><strong>이메일:</strong> {user.email}</p>
        <p><strong>가입일:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        <p><strong>구독 상태:</strong> {user.is_subscribed ? "구독 중" : "구독 안 함"}</p>
        <p><strong>API Key:</strong> {user.api_key || "등록되지 않음"}</p>
        <p><strong>API Secret:</strong> {user.api_secret ? "등록됨" : "등록되지 않음"}</p>
      </div>
    </div>
  );
};

export default MyInfo;