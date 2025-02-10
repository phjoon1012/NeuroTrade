import apiClient from "./apiClient";  // Reusable Axios instance


export const getUpbitBalance = async () => {
    try {
        const response = await apiClient.get("/users/balance/", { withCredentials: true });
        return response.data;
      } catch (error) {
        console.error("❌ Error fetching Upbit balance:", error.response?.data || error.message);
        return { error: error.response?.data?.error || "Failed to fetch balance" };
      }
};


export const fetchTradeHistory = async () => {
    try {
      const response = await apiClient.get("/strategies/user-trades/", { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error fetching trade history:", error);
      return [];
    }
  };