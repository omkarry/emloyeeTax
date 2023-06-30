import axios from "axios";
import { useState } from "react";
import { userData } from "../data/userData";

const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const axiosInstance = axios.create({
    // baseURL: "https://taxdeclaration.azurewebsites.net/api/",
    baseURL: "https://localhost:44329/api/",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom: any) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  const refreshToken = async () => {
    try {
      console.log("Refresh Token api was called");
      const response = await axiosInstance.post(
        `Authenticate/RefreshToken`,
        {
          accessToken: localStorage.getItem("token"),
          refreshToken: localStorage.getItem("refreshToken"),
        }
      );
      const { accessToken, refreshToken } = response.data;

      // Store the new tokens in local storage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return accessToken;
    } catch (error) {
      throw error;
    }
  };

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      setLoading(true);
      const payload = localStorage.getItem("token");
      config.headers["Authorization"] = `Bearer ${payload}`;
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      setLoading(false);
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {

          // Token refresh is already in progress, add the request to the queue
          try {
            const token = await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return await axiosInstance(originalRequest);
          } catch (err) {
            return await Promise.reject(err);
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          refreshToken()
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              processQueue(null, token);
              resolve(axiosInstance(originalRequest));
            })
            .catch((error) => {
              processQueue(error, null);
              reject(error);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    }
  );

  return { axiosInstance, loading };
};

export default useHttp;