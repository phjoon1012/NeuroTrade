import "./LandingPage.css";  // Import shared CSS
import logo from './text.png'
import React, { useEffect, useState } from "react";
import axios from "axios";



const Header = () => {
    const [user, setUser] = useState(null);  // State to hold user info

    useEffect(() => {
      // Fetch user info from Django when the component mounts
      const fetchUser = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/users/me/", {
            withCredentials: true,  // To include session cookies
          });
          setUser(response.data);  // Set user data on successful login
        } catch (error) {
          console.log("User not authenticated");
        }
      };
  
      fetchUser();
    }, []);



  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="logo" className="logo-image" />
      </div>      
      <nav className="nav-links">
        <a href="/landingpage">홈</a>
        <a href="/livemonitoring">모니터링</a>
        <a href="/strategies">전략</a>
        <a href="/backtesting">백테스팅</a>
        <a href="/myinfo">내 정보</a>
        <a href="#support">고객센터</a>

      </nav>
      <div className="auth-links">
        {user ? (
          <>
            <span className="username">{user.username} 님</span>
            <button className="logout-btn" onClick={() => window.location.href = 'http://localhost:8000/accounts/logout/'}>로그아웃</button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={() => window.location.href = 'http://localhost:8000/accounts/google/login/'}>로그인</button>
            <button className="signup-btn">회원가입</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;