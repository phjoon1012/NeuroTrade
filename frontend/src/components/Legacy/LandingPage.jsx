import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./LandingPage.css";
import { loginUser } from "../../api"; // Ensure the correct path to api.js

const LandingPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username: id, password });

      alert(response.data.message);
      console.log("Logged-in user:", response.data.user); // ✅ Verify user data

      navigate("/main"); // ✅ Redirect to main page after login
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="landing-page">
      {/* 🔹 Logo Section */}
      <div className="logo-container">
        <img src="LOGO.png" alt="NeuroTrade Logo" className="logo fade-in" />
      </div>

      {/* 🔹 Credentials Form */}
      <div className="credentials-box fade-in">
        <form onSubmit={handleSubmit}>
          <h2>로그인</h2>

          <div className="input-group">
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디 입력"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">시작</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;