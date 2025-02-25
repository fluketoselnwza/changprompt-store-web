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
    // const originalRequest = error.config;

    console.log("error ==> ", error?.response?.status);

    if (
      error?.response?.status === 555
      // error.response?.data?.message === "token expired"
    ) {
      const resp = await refreshToken();

      console.log("resp 401 ==> ", resp);
      // if (resp) {
      //   console.log("resp ==> ", resp);
      // localStorage.setItem(
      //   `charm-${resp?.role_code?.toLowerCase()}`,
      //   JSON.stringify(resp)
      // );
      // const access_token = resp?.token;
      // const access_token = resp.response.accessToken;
      // addTokenToLocalStorage(access_token);
      // axiosInstance.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${access_token}`;
      // }
      // return axiosInstance(originalRequest);
    }
  }
);

export { axiosInstance };
