import React, { useEffect, useState } from 'react';

import axiosInstance from "../utils/axios";

import useSWR from 'swr';


const fetcher = url => axiosInstance.get(url).then(response => response.data);

const useTokenStatus = () => {

    const { data, error } = useSWR(`/api/user/check-token`, fetcher);

    const isTokenValid = data ? true : false;
    
    const [loggedIn, setLoggedIn] = useState(isTokenValid);

    return {loggedIn, setLoggedIn}
}

export default useTokenStatus;