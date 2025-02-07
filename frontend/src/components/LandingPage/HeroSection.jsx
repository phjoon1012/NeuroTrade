import "./LandingPage.css";  // Reuse the existing CSS
import logo from "./FullLogo_Transparent.png"
import React, { useEffect, useState } from "react";
import { fetchUserCount } from "../../api";  // Import from your api.js



const HeroSection = () => {

    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
      const getUserCount = async () => {
        try {
          const response = await fetchUserCount();
          console.log(response.data.user_count);
          setUserCount(response.data.user_count);  // Assuming the API returns { count: number }
        } catch (error) {
          console.error("Failed to fetch user count:", error);
        }
      };
  
      getUserCount();
    }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <img src={logo} alt="NeuroTrade Logo" className="hero-logo" />
        <h1>AI 기반 자동화 트레이딩 플랫폼</h1>
        <p>최첨단 인공지능 기술로 시장을 분석하고, 자동화된 거래로 최고의 수익을 창출하세요.</p>
        <button className="primary-btn" onClick={() => window.location.href = 'http://localhost:8000/accounts/google/login/'}>지금 시작하기</button>
        <p className="user-count">현재 <strong>{userCount}</strong> 명의 유저가 사용 중입니다!</p>

      </div>
    </section>
  );
};

export default HeroSection;