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
    const token = null;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
