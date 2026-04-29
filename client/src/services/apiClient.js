import axios from "axios";

const baseURL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

/** @type {() => Promise<string | null>} */
let getIdToken = async () => null;

/**
 * Register how to obtain a Firebase ID token for API requests (set from AuthProvider).
 */
export function setIdTokenProvider(fn) {
  getIdToken = fn;
}

const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use(async (config) => {
  const token = await getIdToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
