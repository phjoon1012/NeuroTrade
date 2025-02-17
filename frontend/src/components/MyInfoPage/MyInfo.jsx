// src/components/MyInfo.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../LandingPage/Header";  // Import navbar
import "./MyInfo.css";

const MyInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/profile/", {
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