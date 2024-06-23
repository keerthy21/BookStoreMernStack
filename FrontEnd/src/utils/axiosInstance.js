import axios from "axios"

const axiosInstance = axios.create({
    withCredentials: true, // Enable credentials such as cookies in cross-origin requests
    baseURL: import.meta.env.VITE_API_URL // Set the base URL from environment variable
  });
  
  export default axiosInstance;