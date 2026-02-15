import axios from "axios";
import { getToken } from "../utils/auth";

/*
 * Axios instance for all API calls.
 * Our backend auth routes are under: /api/auth
 */
const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});


/*
 * Request interceptor:
 * If a JWT token exists, attach it to the Authorization header.
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;