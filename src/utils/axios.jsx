import axios from 'axios';

const axiosInstance=axios.create({
    baseURL:"https://j498q3sl-5000.inc1.devtunnels.ms", 
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