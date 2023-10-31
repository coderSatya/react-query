import axios from "axios";



const axiosInstance = axios.create({
    baseURL: baseUrlApi
  });
  
  axiosInstance.interceptors.request.use((config) => {
    const cookies = parseCookies();
  
    const token = cookies?.career_token;
    if (token && !!config.headers) {
      config.headers["x-access-token"] = `${token}`;
    }
  
    return config;
  });