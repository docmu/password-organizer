
import './App.css';
import React, {useState} from 'react';
import { Routes, Route} from "react-router-dom";
import Login from './Login/Login';
import MyPasswords from './MyPasswords/MyPasswords';
import CreatePassword from './CreatePassword/CreatePassword';
import { AuthProvider } from "./Auth";
import db from './utils';

//wrap auth provider around the root component to pass authenticated state to all children
//App provides all the routes
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
