import React, { useContext, useEffect } from "react";

import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/Auth';

const useTokenChecker = () => {

    const { loggedIn, setLoggedIn, role, setRole } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {

        if (loggedIn) {

            role === 'user' ? navigate("/user-dashboard") : navigate("/admin-dashboard");
        } else {

            navigate("/login")
        }

    }, [loggedIn])

    return {loggedIn, setLoggedIn, role, setRole};
}
export default useTokenChecker;