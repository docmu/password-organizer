
import './App.css';
import React, {useState} from 'react';
import { Routes, Route} from "react-router-dom";
import Login from './Login/Login';
import MyPasswords from './MyPasswords/MyPasswords';
import CreatePassword from './CreatePassword/CreatePassword';
import { AuthProvider } from "./Auth";
import db from './utils';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/myPasswords" element={<MyPasswords />} />  
          <Route path="/createPassword" element={<CreatePassword />} />  
        </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
