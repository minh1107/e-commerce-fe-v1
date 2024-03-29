import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true', // incorrect,
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
      const storageData = localStorage.getItem("persist:shop/user");
      const jsonAccessToken = JSON.parse(storageData).token
      const accessToken = jsonAccessToken.slice(1, jsonAccessToken.length - 1)
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response.data;
});

export default instance