import apiClient from "./apiClient";  // Reusable Axios instance
import axios from 'axios';
// Fetch all strategies
export const fetchStrategies = async () => {
  try {
    const response = await apiClient.get("/strategies/");
    console.log("Received strategies:", response.data);  // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching strategies:", error);
    throw error;
  }
};
export const sendSelectedStrategy = async (strategy) => {
  try {
    const response = await apiClient.post('/strategies/strategies/', strategy,
      {
        withCredentials: true,
      }
    ); // POST endpoint for confirming strategy
    return response.data;
  } catch (error) {
    console.error("Error sending selected strategy:", error);
    throw error;
  }
};

export const sendSubscription = async (isSubscribed) => {
  try {
    const endpoint = isSubscribed 
      ? '/strategies/subscribe/'   // ✅ 구독 요청
      : '/strategies/unsubscribe/'; // ✅ 구독 취소 요청

    const response = await apiClient.post(endpoint, {}, { withCredentials: true });
    
    console.log(`Subscription status updated: ${isSubscribed ? "Subscribed" : "Unsubscribed"}`);
    return response.data;
  } catch (error) {
    console.error(`Error ${isSubscribed ? "subscribing" : "unsubscribing"}:`, error);
    throw error;
  }
};
