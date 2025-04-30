"use client";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [token, setToken] = useState("");
  useEffect(() => {
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    setToken(cookieToken || "");
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
