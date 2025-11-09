import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

    // Helper to safely parse JWT payload
    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    };

    // Monitor token for expiration and redirect to login if expired
    useEffect(() => {
        if (!authState.isLoading && authState.token) {
            const payload = parseJwt(authState.token);
            if (payload && payload.exp) {
                const now = Math.floor(Date.now() / 1000);
                if (payload.exp < now) {
                    // token expired -> clear auth and send to login
                    logout();
                    navigate('/login');
                }
            }
        }
    }, [authState.token, authState.isLoading]);

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
            credentials: 'include', // accept Set-Cookie from server
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
        // Attempt to clear server cookie as well
        try {
            fetch(`${API_URL.AUTH}/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
        } catch (e) {}

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