import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from './pages/Dashboard';
import Home from './pages/Home';
import Form from './pages/form';
import NotFound from './pages/NotFound';
import SignIn from './pages/entry';
import RegistrationForm from './pages/UserInfo';
import Wallet from './pages/wallet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path='/dashboard' element={<DashBoard/>}/>
        <Route exact path="/form" element={<Form/>} />
        <Route exact path="/entry" element={<SignIn/>} />
        <Route exact path="/wallet" element={<Wallet/>} />
        <Route exact path="/userinfo" element={<RegistrationForm/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 