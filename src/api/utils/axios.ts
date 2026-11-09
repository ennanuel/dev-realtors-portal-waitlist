import { getStoreName, REALTOR_TOKEN_SESSION_KEY } from "@/constants/routes";
import { getSession } from "@/lib/sessionmanager";
import axios from "axios";

const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5 * 60 * 1000,
  withCredentials: false,
});

authAxios.interceptors.request.use(
  async (config) => {
    const token = await getSession<string>(REALTOR_TOKEN_SESSION_KEY);
    const storeName = getStoreName();
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    if (storeName) config.headers["store-name"] = storeName;
    return config;
  },
  (error) => Promise.reject(error),
);

export default authAxios;
