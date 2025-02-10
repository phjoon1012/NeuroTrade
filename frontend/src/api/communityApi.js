import apiClient from "./apiClient";

// Fetch all feedbacks
export const fetchFeedbacks = async () => {
    try {
        const response = await apiClient.get("/community/feedbacks/");
        return response.data;
    } catch (error) {
        console.error("🚨 Error fetching feedbacks:", error);
        throw error;
    }
};

// Submit feedback
export const submitFeedback = async (rating, comment) => {
    try {
        const response = await apiClient.post("/community/feedbacks/submit/", { rating, comment });
        return response.data;
    } catch (error) {
        console.error("🚨 Error submitting feedback:", error.response);
        throw error;
    }
};