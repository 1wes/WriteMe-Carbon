import React, { useEffect } from "react";

import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from "../context/Auth";


const useTokenStatus = () => {

    const navigate = useNavigate(); 
    const currentLocation = useLocation().pathname;

    const { loggedIn } = useAuth();

    useEffect(() => {

        if (loggedIn) {
            navigate(currentLocation)
        } else {
            navigate("/login")
        }
    }, [currentLocation]);
}

export default useTokenStatus;
