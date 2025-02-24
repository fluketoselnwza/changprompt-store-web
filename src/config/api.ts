import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL : ", API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const userObject = localStorage.getItem("user_changprompt") || "";

    const user = userObject ? JSON.parse(userObject) : "";

    if (user?.access_token) {
      config.headers["Authorization"] = `Bearer ${user?.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
