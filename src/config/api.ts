import axios from "axios";
import { refreshTokenService } from "@/services/auth";

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

const refreshToken = async () => {
  const userObject = localStorage.getItem("user_changprompt") || "";
  const refresh_token = userObject
    ? JSON.parse(userObject).refresh_token
    : null;

  try {
    if (refresh_token) {
      const response = await refreshTokenService(refresh_token);

      return response;
    }
  } catch (e) {
    console.log("Error", e);
  }
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    console.log("error ==> ", error?.response?.status);

    if (
      error?.response?.status === 401 &&
      error.response?.data?.message === "Token expired"
    ) {
      const result = await refreshToken();

      console.log("result 401 ==> ", result);
      if (result) {
        const userObject = {
          partner_code: result?.partner_code,
          partner_name: result?.partner_name,
          role_code: result?.role_code,
          access_token: result?.access_token,
          refresh_token: result?.refresh_token,
        };

        localStorage.setItem("user_changprompt", JSON.stringify(userObject));

        if (result?.access_token) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${result?.access_token}`;
        }
      }
      return axiosInstance(originalRequest);
    }
  }
);

export { axiosInstance };
