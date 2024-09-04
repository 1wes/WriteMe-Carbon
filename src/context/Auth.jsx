import React, { createContext, useEffect, useState, useContext } from 'react';

import axiosInstance from '../utils/axios';

import useSWR from 'swr';

import { useNavigate, useLocation } from 'react-router-dom';


const fetcher = url => axiosInstance.get(url).then(response => response.data);

const AuthContext = createContext();

const useAuth = () => {
    
    return useContext(AuthContext);
}


const AuthContextProvider = ({ children }) => {

    const { data, error, isLoading } = useSWR(`/api/user/check-token`, fetcher);

    let isTokenValid;

    const currentLocation = useLocation().pathname;

    if (data) {
        
        if (data.code === 200) {
            isTokenValid = true;
        } else {
            isTokenValid = false;
        }
    }

    const navigate = useNavigate();
    
    const [loggedIn, setLoggedIn] = useState();
    const [role, setRole] = useState();
    const [names, setNames] = useState({
        firstName: '', 
        lastName:''
    })

    useEffect(() => {
        if (error) {
            setLoggedIn(false);
        }

        if (data) {
            setLoggedIn(isTokenValid);
            setRole(data.role);
            setNames({
                firstName: data.firstName,
                lastName:data.lastName
            })
        }
    }, [error, data]);

    useEffect(() => {

        if (loggedIn) {

                if (currentLocation === "/login") {
                    handleLogin(role)
                } else {
                    navigate(currentLocation);
                }
        } else {
            navigate("/login")
        }    
    }, [loggedIn, role, currentLocation]);

    const handleLogin = (UserRole) => {
            
        UserRole === 'User' ? navigate("/user-dashboard") : navigate("/admin-dashboard");
    }

    return (
        
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, handleLogin, isTokenValid,isLoading, role, setRole, names, setNames}}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    useAuth
}

export default AuthContextProvider;