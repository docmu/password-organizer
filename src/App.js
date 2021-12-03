
import './App.css';
import React, {useState} from 'react';
import { Routes, Route} from "react-router-dom";
import Login from './Login/Login';
import MyPasswords from './MyPasswords/MyPasswords';
import CreatePassword from './CreatePassword/CreatePassword';
import { AuthProvider } from "./Auth";
import db from './utils';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const onLogoutClick = () => {
    // window.localStorage.setItem('authenticated', false);
    // setAuthenticated(window.localStorage.getItem('authenticated'))
    // console.log('logged out')
  }

  const onLoginClick = () => {
      // window.localStorage.setItem('authenticated', true);
      // setAuthenticated(window.localStorage.getItem('authenticated'))
      // console.log(window.localStorage.getItem('authenticated'))
  }

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Login onLoginClick={onLoginClick} authenticated={authenticated}/>} />
          <Route path="/myPasswords" element={<MyPasswords onLogoutClick={onLogoutClick} authenticated={authenticated}/>} />  
          <Route path="/createPassword" element={<CreatePassword authenticated={authenticated}/>} />  
        </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
