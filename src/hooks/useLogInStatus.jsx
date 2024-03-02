import React, { useContext, useEffect } from "react";

import { useNavigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../context/Auth';

const useTokenChecker= (role) => {

    const {loggedIn, setLoggedIn} = useContext(AuthContext);

    const navigate = useNavigate();

    const currentLocation = useLocation().pathname;

    useEffect(() => {

        if (currentLocation === "/login") {
            // console.log("at login page")
            if (loggedIn) {
                navigate("/admin-dashboard");
                // navigate to appropriate page based on user role
                // role==='user'?navigate("/user-dashboard"):navigate("/admin-dashboard");
            } else {
                // stay in login page is token is invalid
            }
        } else {
            if (loggedIn) {
                // console.log(currentLocation)
                // stay in current page if token is valid
            } else {
                navigate("/login")
            }
        }

    }, [currentLocation, loggedIn])

    return {loggedIn, setLoggedIn};
}
export default useTokenChecker