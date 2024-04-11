import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from "../utils/axios";

import useSWR from 'swr';


const fetcher = url => axiosInstance.get(url).then(response => response.data);

const useTokenStatus = () => {

    const [isTokenValid, setIsTokenValid] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const navigate = useNavigate();

    // rertrieve current validity on component mount
    useEffect(() => {
        
        const storedValidity = localStorage.getItem("tokenValidity");

        if (storedValidity) {
            setIstokenValid(JSON.parse(storedValidity));
        }
    }, []);

    const { data, error } = useSWR(`/api/user/check-token`, fetcher);
    
    //update the validity with latest from server 
    useEffect(() => {
        
        if (data) {
            setIsTokenValid(true);
            setUserRole(data.role);
            localStorage.setItem('tokenValid', true);
        } else {
            setIsTokenValid(false);
            setUserRole(null);
            localStorage.setItem('tokenValid', false);
        }
    }, [data]);

    // log user out if token is invalid
    useEffect(() => {

        if (!isTokenValid) {
            navigate("/login");
        }
    }, [isTokenValid, navigate]);

    return { isTokenValid, userRole }
}

export default useTokenStatus;