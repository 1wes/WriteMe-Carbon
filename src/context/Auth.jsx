import React, { createContext, useEffect, useState, useContext } from 'react';

import axiosInstance from '../utils/axios';

import useSWR from 'swr';

import { useNavigate } from 'react-router-dom';


const fetcher = url => axiosInstance.get(url).then(response => response.data);

const AuthContext = createContext();

const useAuth = () => {
    
    return useContext(AuthContext);
}


const AuthContextProvider = ({ children }) => {

    const { data, error, isLoading } = useSWR(`/api/user/check-token`, fetcher);

    const isTokenValid = data && data.code === 200 ? true : false;

    const navigate = useNavigate();
    
    const [loggedIn, setLoggedIn] = useState(isTokenValid);
    const [role, setRole] = useState();

    useEffect(() => {
        if (error) {
            setLoggedIn(false);
        }

        if (data) {
            setRole(data.role);
        }
    }, [error, data, isLoading]);

    useEffect(() => {
        
        if (loggedIn) {
        
            handleLogin(role)
        } else {
            navigate("/login")
        }
    }, [loggedIn, role])

    const handleLogin = (UserRole) => {
            
        UserRole === 'user' ? navigate("/user-dashboard") : navigate("/admin-dashboard");
    }

    console.log(role, loggedIn)

    return (
        
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, handleLogin, isTokenValid,isLoading, error, role, setRole}}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    useAuth
}

export default AuthContextProvider;