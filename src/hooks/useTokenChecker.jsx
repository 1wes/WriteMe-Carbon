import React, { useContext } from "react";

import { useNavigate, useLocation } from 'react-router-dom';

import AuthContext from '../context/Auth';

const useTokenChecker= () => {

    const loginStatus = useContext(AuthContext);

    const navigate = useNavigate();

    const location = useLocation().pathname;

    if (location === "/login") {

        if (loginStatus) {
            navigate("/home")
        }
        
    } else {
        if (!loginStatus) {
        
            navigate("/login")
        }
    }

    return loginStatus;
}
export default useTokenChecker