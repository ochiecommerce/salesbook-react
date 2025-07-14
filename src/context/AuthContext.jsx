import React, { createContext, useContext, useState, useEffect } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const data = await authApi.login({ username, password });
    localStorage.setItem("token", data.access || data.key); // dj-rest-auth may return 'access' or 'key'
    setToken(data.access || data.key);

    const userRes = await authApi.getUser(data.access || data.key);
    setUser(userRes.data);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (_) {
      // Even if logout fails (e.g., token already expired), proceed
    }
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await authApi.getUser(token);
          setUser(res.data);
        } catch {
          logout(); // Token might be invalid
        }
      }
    };
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
