import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from "../utils/axios";

import useSWR from 'swr';


const fetcher = url => axiosInstance.get(url).then(response => response.data);

const useTokenStatus = () => {

    const navigate = useNavigate();

    const { data, error } = useSWR(`/api/user/check-token`, fetcher);

    const isTokenValid = data ? true : false;

    let userRole;

    if (data) {
        userRole=data.role
    }

    useEffect(() => {

        if (isTokenValid) {
            // remain in current location
        } else {
            navigate("/login")
        }
    },[data])

    return { isTokenValid, userRole }
}

export default useTokenStatus;