// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login as _login,
  logout as _logout,
  setAuthToken,
  getUser,
} from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      getUser()
        .then((res) => setUser(res.data))
        .catch(() => {
          // If token invalid, logout
          setToken(null);
          setAuthToken(null);
          setUser(null);
          localStorage.removeItem("token");
        });
    } else {
      setUser(null);
      setAuthToken(null);
    }
  }, [token]);
  const login = (credentials) => {
    return _login(credentials).then((res) => {
      setAuthToken(res.data.key);
      getUser().then((res) => setUser(res.data)).catch((err)=>{
        console.log(err)
      });
      console.log(user)
    });
  };

  const logout = async () => {
    try {
      await _logout();
    } catch (_) {
      // Even if logout fails (e.g., token already expired), proceed
    }
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
