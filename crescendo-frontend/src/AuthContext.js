import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     console.log('Authentication state changed:', isAuthenticated);
    //     localStorage.setItem('isAuthenticated', isAuthenticated);
    // }, [isAuthenticated]);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/check', {
                    credentials: 'include', // Important for sessions
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Failed to check authentication status:', error);
                setIsAuthenticated(false);
            }
        };
    
        checkAuthStatus();
    }, []);

    const login = () => {
        console.log("Login function called");
        setIsAuthenticated(true);
    };
    
    
    // const logout = () => setIsAuthenticated(false);


    const logout = async () => {
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                credentials: 'include', // Important for sessions
            });
            if (response.ok) {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;