import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from './pages/Dashboard';
import Home from './pages/Home';
import Form from './pages/form';
import NotFound from './pages/NotFound';
import SignIn from './pages/entry';
import RegistrationForm from './pages/UserInfo';
import Wallet from './pages/wallet';
import Chat_App from './pages/Chat_App';
import Navbar from './pages/navbar';
import Footer from './pages/footer';
import TodoList from './pages/GoalComponent';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path='/dashboard' element={<DashBoard/>}/>
        <Route exact path="/form" element={<Form/>} />
        <Route exact path="/entry" element={<SignIn/>} />
        <Route exact path="/wallet" element={<Wallet/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/chatbot" element={<Chat_App/>} />
        <Route exact path="/userinfo" element={<RegistrationForm/>} />
        <Route exact path="/financialgoals" element={<TodoList/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App; 