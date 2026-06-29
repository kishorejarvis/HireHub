import { createContext, useContext, useState, useEffect } from "react";

import { apiLogin } from "./AuthApiAdapter";

const AuthContext = createContext(null);

const TOKEN_KEY = "token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        // Only accept stored auth if token exists (future backend integration).
        if (storedToken) setUser(parsed);
        else setUser(parsed); // keep mock behaviour for now
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // login is still compatible with existing UI (Login.jsx uses it synchronously).
  // If/when backend exists, you can pass a password and it will switch to API login.
  const login = async (email, role, userName, password) => {
    const normalizedRole = role === "jobseeker" ? "jobseeker" : "employer";

    // Future: if backend exists and password is provided, try API login.
    if (password) {
      try {
        const data = await apiLogin({ email, password, role: normalizedRole });

        const token = data?.token || data?.data?.token;
        const backendUser = data?.user || data?.data?.user;

        if (token && backendUser) {
          const userData = {
            email: backendUser.email || email,
            role: backendUser.role || normalizedRole,
            userName: backendUser.name || backendUser.fullName || userName,
            isAuthenticated: true,
          };

          setUser(userData);
          localStorage.setItem(TOKEN_KEY, token);
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("userRole", userData.role);
          localStorage.setItem("userName", userData.userName);
          return;
        }
      } catch (e) {
        // Fall back to mock login for frontend-only mode.
        console.error("API login failed, falling back to mock login", e);
      }
    }

    // Frontend-only mock login (current behaviour).
    const userData = {
      email,
      role: normalizedRole,
      userName,
      isAuthenticated: true,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem(TOKEN_KEY, localStorage.getItem(TOKEN_KEY) || "mock");
    localStorage.setItem("userRole", normalizedRole);
    localStorage.setItem("userName", userName);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem(TOKEN_KEY);
  };

  const isAuthenticated = user !== null;

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

