"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const cookies = parseCookies();

  const userStateAuth = (userState) => {
    setCookie(null, "userState", JSON.stringify(userState), {
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      path: "/",
    });
    setUser(userState);
  };

  const getUserStateAuth = () => {
    return cookies.userState ? JSON.parse(cookies.userState) : null;
  };

  useEffect(() => {
    setUser(getUserStateAuth());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userStateAuth,
        getUserStateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
