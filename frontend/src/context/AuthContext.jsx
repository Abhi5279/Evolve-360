import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../api/axios";

/*
=====================================================
  Auth Context
=====================================================
*/

const AuthContext = createContext();

/*
=====================================================
  Provider
=====================================================
*/

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  -----------------------------------------------------
    Initialize from localStorage
  -----------------------------------------------------
  */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  /*
  -----------------------------------------------------
    Login
  -----------------------------------------------------
  */
  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

    return user;
  };

  /*
  -----------------------------------------------------
    Register
  -----------------------------------------------------
  */
  const register = async (name, email, password) => {
    return await authAPI.register({ name, email, password });
  };

  /*
  -----------------------------------------------------
    Logout
  -----------------------------------------------------
  */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  /*
  -----------------------------------------------------
    Context Value
  -----------------------------------------------------
  */
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/*
=====================================================
  Custom Hook
=====================================================
*/

export function useAuth() {
  return useContext(AuthContext);
}
