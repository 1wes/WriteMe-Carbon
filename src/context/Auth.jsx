import React, { createContext } from 'react';

import useTokenStatus from '../hooks/useTokenStatus';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const { loggedIn, setLoggedIn } = useTokenStatus();

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