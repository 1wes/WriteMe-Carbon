import axios from 'axios';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const axiosInstance = axios.create({
    baseURL: SERVER_BASE_URL,
});

axiosInstance.interceptors.request.use(

    (config)=>{

        config.withCredentials=true

        return config;
    }, (error)=>{

        return Promise.reject(error);
    }
);
export default axiosInstance;