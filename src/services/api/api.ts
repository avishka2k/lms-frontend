import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const authResponse = JSON.parse(
      localStorage.getItem("authResponse") || "{}"
    );
    if (authResponse && authResponse.AuthenticationResult.AccessToken) {
      config.headers[
        "Authorization"
      ] = `Bearer ${authResponse.AuthenticationResult.AccessToken}`;
    }
    console.log("Request Token:", authResponse.AuthenticationResult.AccessToken); // Log the token for debugging. Remove this line in production
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
