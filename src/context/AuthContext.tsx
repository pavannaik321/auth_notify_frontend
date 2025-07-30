"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { connectSocket } from "@/lib/socket";
import { setToken as setAuthHeader } from "@/lib/api";

interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // ← NEW

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setToken(stored);
      setAuthHeader(stored);
      connectSocket(stored);
    }
    setLoading(false); // ← Moved here
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setAuthHeader(newToken);
    connectSocket(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
