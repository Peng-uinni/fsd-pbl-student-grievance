import React, { createContext, useContext, useState, useEffect } from 'react';
import {API_URL} from '../urls';

const AuthContext = createContext({
    login: () => { console.error('Auth context not ready or loaded.');
    return Promise.reject(new Error('Auth context not ready.')); },
});

/**
 * @function useAuth
 * @description Custom hook to use the AuthContext data and functions.
 */
export const useAuth = () => {
    return useContext(AuthContext);
};

/**
 * @component AuthProvider
 * @description Provides authentication state and functions (login/logout) to the application.
 */
export const AuthProvider = ({ children }) => {
    // State to hold user data (id, name, role) and token
    const [authState, setAuthState] = useState({
        user: null,
        token: null,
        role: null,
        isAuthenticated: false,
        isLoading: true, // For initial check
    });

    // Load state from localStorage on initial load
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const storedRole = localStorage.getItem('role');

        if (storedToken && storedUser && storedRole) {
            setAuthState({
                user: JSON.parse(storedUser),
                token: storedToken,
                role: storedRole,
                isAuthenticated: true,
                isLoading: false,
            });
        } else {
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    // --- 2. Login Function ---
    const login = async (userId, password, role) => {
        let endpoint = '';
        if (role === 'student') {
            endpoint = `${API_URL.AUTH}/student/login`;
        } else if (role === 'admin') {
            endpoint = `${API_URL.AUTH}/admin/login`;
        } else {
            throw new Error('Invalid role specified');
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Store data in state and localStorage
            const { user, token } = data;
            
            setAuthState({
                user: user,
                token: token,
                role: user.role,
                isAuthenticated: true,
                isLoading: false,
            });

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('role', user.role);

            return { success: true, message: `Welcome back, ${user.name}!` };

        } else {
            // Login failed
            throw new Error(data.error || 'Login failed. Check credentials.');
        }
    };

    // --- 3. Logout Function ---
    const logout = () => {
        setAuthState({
            user: null,
            token: null,
            role: null,
            isAuthenticated: false,
            isLoading: false,
        });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
    };

    // --- 4. The Auth Header Getter ---
    // Use this to dynamically get the header for protected requests
    const getAuthHeader = () => {
        if (authState.token) {
            return { 'Authorization': `Bearer ${authState.token}` };
        }
        return {};
    };

    const value = {
        ...authState,
        login,
        logout,
        getAuthHeader,
    };

    // Wait until initial loading from localStorage is complete
    if (authState.isLoading) {
        return <div style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>Loading application...</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;