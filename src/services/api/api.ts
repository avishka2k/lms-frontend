import { Auth } from "aws-amplify";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  async (config) => {
    const session = await Auth.currentSession();
    const token = session.getAccessToken().getJwtToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
