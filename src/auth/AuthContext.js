import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthApi } from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = new AuthApi()

    if(!user)api.getUser().then(
        user=>{
          console.log('user:',user.data)
            setUser(user.data)
    setLoading(false)
        }
    )
    .catch(()=>{
        setUser(null)
    setLoading(false)
    }
    )

  const login = async (credentials) => {
    await api.login(credentials)
    setUser({username:credentials.username});
  };

  const logout = () => {
    setUser(null);
    api.logout()
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);