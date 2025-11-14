import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}){
  const [authState, setAuthState] = useState({
    email: null,
    name: null,
    role: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const localAuth = JSON.parse(localStorage.getItem('auth'));
    if(localAuth){
      if(localAuth.isAuthenticated){
        setAuthState(localAuth);
      }   
    }
  }, [])

  const login = async (email, password, role) => {
    let endpoint = 'http://localhost:8080/api/auth/'+role+'/login';
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({email, password}),
    })

    const data = await res.json();
    if(res.ok && data.success) {
      setAuthState({
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        isAuthenticated: true,
      });
      localStorage.setItem('auth', JSON.stringify({...data.user, isAuthenticated: true}));
    }

    else{
      console.log("login failed handle it");
    }
  }

  const logout = () => {
    try {
      console.log('logout');
      fetch(`http://localhost:8080/api/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
    } catch (e) {
      console.error(e);
    }

    setAuthState({
      email: null,
      user: null,
      role: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('auth');
  }

  return <AuthContext.Provider value={{...authState, login: login, logout: logout}}> {children} </AuthContext.Provider>;
}