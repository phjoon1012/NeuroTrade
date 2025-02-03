import axios from "axios";

// Function to get CSRF token from cookies
const getCSRFToken = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      return value;
    }
  }
  return null;
};

// Axios instance with CSRF token and credentials
const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,  // Ensure cookies (sessionid, csrftoken) are sent with requests
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": getCSRFToken(),  // Attach CSRF token
  },
});

export const loginUser = (credentials) => API.post("/users/login/", credentials);
export const logoutUser = () =>
  API.post("/users/logout/", {}, {
    headers: {
      "X-CSRFToken": getCSRFToken(),  // Attach CSRF token
    },
  });
  export const fetchUserInfo = () => API.get("/users/me/");