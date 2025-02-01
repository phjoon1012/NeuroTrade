import React, { useState } from "react";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api";  // Adjust path if necessary
import Dashboard from "./Sidebar/Dashboard";
import Backtesting from "./Sidebar/Backtesting";
import UserSettings from "./Sidebar/UserSettings";
import Bots from "./Sidebar/Bots";
import Home from "./Home"

const MainPage = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await logoutUser();  // Call the logout API
      alert("Logged out successfully!");

      // Clear user state if you're using context/state management
      navigate("/");  // Redirect to login or landing page
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "home":
        return <Home />;
      case "dashboard":
        return <Dashboard />;
      case "backtesting":
        return <Backtesting />;
      case "user-settings":
        return <UserSettings />;
      case "bots":
        return <Bots />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="main-page">
<div className="sidebar">
  {/* Sidebar Menu */}
  <button
    className={`sidebar-item ${activeMenu === "home" ? "active" : ""}`}
    onClick={() => setActiveMenu("home")}
  >  
    <i className="fas fa-chart-line"></i> 홈

  </button>
  <button
    className={`sidebar-item ${activeMenu === "dashboard" ? "active" : ""}`}
    onClick={() => setActiveMenu("dashboard")}
  >
    <i className="fas fa-chart-line"></i> 대쉬보드
  </button>
  <button
    className={`sidebar-item ${activeMenu === "bots" ? "active" : ""}`}
    onClick={() => setActiveMenu("bots")}
  >
    <i className="fas fa-robot"></i> 전략
  </button>
  <button
    className={`sidebar-item ${activeMenu === "backtesting" ? "active" : ""}`}
    onClick={() => setActiveMenu("backtesting")}
  >
    <i className="fas fa-history"></i> 벡테스팅
  </button>
  <button
    className={`sidebar-item ${activeMenu === "user-settings" ? "active" : ""}`}
    onClick={() => setActiveMenu("user-settings")}
  >
    <i className="fas fa-cogs"></i> 세팅
  </button>

  {/* Logout Button */}

  <button onClick={handleLogout} className="sidebar-item logout-button">
    <i className="fas fa-sign-out-alt"></i> 로그아웃
  </button>

  {/* Footer */}
  <div className="sidebar-footer">© 2025 Neuro Trade</div>
</div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default MainPage;