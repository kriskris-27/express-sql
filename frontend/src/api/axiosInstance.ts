import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

console.log("AxiosInstance baseURL:", baseURL);

const axiosInstance = axios.create({
  baseURL,  
});

export default axiosInstance;