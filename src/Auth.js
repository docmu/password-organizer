import React, { useEffect, useState } from "react";
import db from "./utils";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
      if(window.localStorage.getItem('authenticated') !== null){
        const val = (window.localStorage.getItem('authenticated') === 'true')
        setAuth(val)
        console.log(typeof(val), val)
      }
    console.log('Auth initial state ', auth)
  }, []);

  useEffect(() => {
    console.log('Auth updated ', auth)
  }, []);

  const onLogin = () => {
    window.localStorage.setItem('authenticated', true);
    const val = (window.localStorage.getItem('authenticated') === 'true')
    setAuth(val)
    console.log('logged in ', auth)
  }

  const onLogout = () => {
    window.localStorage.setItem('authenticated', false);
    const val = (window.localStorage.getItem('authenticated') === 'true')
    setAuth(val)
    console.log('logged out ', auth)
  }

  return (
    <AuthContext.Provider
      value={{auth, onLogin, onLogout}}
    >
      {children}
    </AuthContext.Provider>
  );
};