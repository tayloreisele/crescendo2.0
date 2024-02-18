import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => localStorage.getItem('isAuthenticated') === 'true'
    );

    useEffect(() => {
        console.log('Authentication state changed:', isAuthenticated);
        localStorage.setItem('isAuthenticated', isAuthenticated);
    }, [isAuthenticated]);

    const login = () => {
        console.log("Login function called");
        setIsAuthenticated(true);
    };
    const logout = () => setIsAuthenticated(false);

    

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;