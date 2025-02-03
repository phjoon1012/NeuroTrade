import React, { useState, useEffect } from "react";
import { fetchUserInfo } from "../../api";  // Ensure this path is correct
import "./UserSettings.css";

const UserSettings = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data when the component loads
  useEffect(() => {
    const getUserInfo = async () => {
      console.log("Fetching user info...");  // Debug: Confirm function is called
      try {
        const response = await fetchUserInfo();
        console.log("User info fetched successfully:", response.data);  // Debug: Log successful response
        setUserInfo(response.data);
      } catch (err) {
        console.error("Error fetching user info:", err.response || err.message);  // Debug: Log errors
        setError("Failed to load user information.");
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  if (loading) {
    return <div>Loading user information...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-settings">
      <h2>사용자 정보</h2>
      <div className="user-info">
        <p><strong>사용자 이름:</strong> {userInfo.username || "미입력"}</p>
        <p><strong>이메일:</strong> {userInfo.email || "미입력"}</p>
        <p><strong>API Key:</strong> {userInfo.api_key || "없음"}</p>
        <p><strong>API Secret:</strong> {userInfo.api_secret ? "**********" : "없음"}</p>
        <p><strong>트레이딩 선호도:</strong> {userInfo.trading_preference || "미선택"}</p>
      </div>
    </div>
  );
};

export default UserSettings;