import axios from "axios";
import { useState } from "react";
import { userData } from "../data/userData";

const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const axiosInstance = axios.create({
    baseURL: "https://taxdeclaration.azurewebsites.net/api/",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      setLoading(true);
      const payload = localStorage.getItem("access_token");
      if (payload) {
        const data:userData = JSON.parse(payload);
        config.headers["Authorization"] = `Bearer ${data.token}`;
      }
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
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  return { axiosInstance, loading };
};

export default useHttp;