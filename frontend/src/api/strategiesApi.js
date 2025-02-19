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

