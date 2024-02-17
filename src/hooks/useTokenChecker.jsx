import React, { useEffect } from "react";

import useSWR from "swr";

import axiosInstance from "../utils/axios";

const fetcher = url => axiosInstance.get(url).then(response => response.data);

const useTokenChecker= () => {

    const { data, error } = useSWR(`/api/user/check-token`, fetcher);
    
    useEffect(() => {

        
    }, []);
}
export default useTokenChecker