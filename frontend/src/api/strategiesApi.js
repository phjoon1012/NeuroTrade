import apiClient from "./apiClient";  // Reusable Axios instance

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