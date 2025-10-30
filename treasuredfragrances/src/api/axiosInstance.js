import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api" // your backend running locally
      : "https://treasuredfragrances.onrender.com/api", // live backend
  withCredentials: true,
});

export default axiosInstance;
