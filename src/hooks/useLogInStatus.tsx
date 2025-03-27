import React, { useEffect } from "react";

import { useAuth } from "../context/Auth";


const useLoginStatus = () => {

    const { loggedIn, handleLogin, role } = useAuth();

    useEffect(() => {
        
        if (loggedIn) {
            handleLogin(role)
        }
    },[])

}

export default useLoginStatus;
