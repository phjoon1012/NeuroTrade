import apiClient from "./apiClient"; // Reusable Axios instance

export const runBacktest = async (params) => {
    try {
      const response = await apiClient.post("/backtesting/run/", params, {
        withCredentials: true,  // ✅ Ensures Django receives session info
      });
      return response.data;
    } catch (error) {
      console.error("Error running backtest:", error);
      throw error;
    }
  };
  
export const getBacktestResults = () => apiClient.get("/backtesting/results/");