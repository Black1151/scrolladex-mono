import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkSessionAPI } from "@/api/authAPI";

interface AuthContextData {
  authenticated: boolean;
  isLoading: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextData>({
  authenticated: false,
  isLoading: true,
  setAuthenticated: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const authResponse = await checkSessionAPI();
        setAuthenticated(authResponse.authenticated);
        if (!authResponse.authenticated) {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Session check failed", error);
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, isLoading, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
