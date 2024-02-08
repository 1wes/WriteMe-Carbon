import axios from 'axios';

const axiosInstance=axios.create({
    baseURL:"http://localhost:5000", 
})

axiosInstance.interceptors.request.use(

    (config)=>{

        config.withCredentials=true

        return config;
    }, (error)=>{

        return Promise.reject(error);
    }
);
export default axiosInstance;