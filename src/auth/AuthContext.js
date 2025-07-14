import React, { createContext, useContext, useState } from 'react';
import { AuthApi } from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState('/');

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

  const register = async (credentials) => {
    await api.register(credentials)
    setUser({username:credentials.username
    });
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, next, setNext, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);