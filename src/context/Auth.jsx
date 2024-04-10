import React, { createContext, useEffect, useState } from 'react';

import useTokenStatus from '../hooks/useTokenStatus';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const { isTokenValid } = useTokenStatus();

    const [loggedIn, setLoggedIn] = useState(isTokenValid);

    useEffect(() => {
        setLoggedIn(isTokenValid)
    }, [isTokenValid]);

    return (
        
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }} >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext
}
export default AuthContextProvider;