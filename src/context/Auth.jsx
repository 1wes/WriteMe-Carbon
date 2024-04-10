import React, { createContext, useEffect, useState } from 'react';

import useTokenStatus from '../hooks/useTokenStatus';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const { isTokenValid, userRole } = useTokenStatus();

    const [loggedIn, setLoggedIn] = useState(isTokenValid);
    const [role, setRole] = useState();

    useEffect(() => {
        setLoggedIn(isTokenValid);
        setRole(userRole);
    }, [isTokenValid, userRole]);

    return (
        
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, role, setRole }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext
}
export default AuthContextProvider;