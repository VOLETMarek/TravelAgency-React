import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    role: "",
  });

  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
