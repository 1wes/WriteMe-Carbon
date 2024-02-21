import React, { useContext } from "react";

import { useNavigate } from 'react-router-dom';

import AuthContext from '../context/Auth';

const useTokenChecker= () => {

    const loginStatus = useContext(AuthContext);

    const navigate = useNavigate();

    if (!loginStatus) {
        
        navigate("/login")
    }

    return loginStatus;

}
export default useTokenChecker