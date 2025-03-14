'use client';
import { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { }
});

// Create a provider component
import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to log in the user
    const login = () => {
        setIsLoggedIn(true);
    };

    // Function to log out the user
    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
