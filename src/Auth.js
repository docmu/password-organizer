import React, { useEffect, useState } from "react";
import db from "./utils";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    console.log('Auth initial state ', auth)
  }, []);

  const onLogin = () => {
    window.localStorage.setItem('authenticated', true);
    setAuth(window.localStorage.getItem('authenticated'))
    console.log('Auth state ', auth)
  }

  const onLogout = () => {
    window.localStorage.setItem('authenticated', false);
    setAuth(window.localStorage.getItem('authenticated'))
    console.log('Auth state ', auth)
  }

//   if(pending){
//     return <>Loading...</>
//   }

  return (
    <AuthContext.Provider
      value={{auth, onLogin, onLogout}}
    >
      {children}
    </AuthContext.Provider>
  );
};