import React from 'react';
import logo from './logo.svg';
import './App.scss';

import * as ReactDOM from "react-dom/client";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import Footer from './Footer/Footer';

function App() {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className="mainContainer"> 
        <Routes>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage/>}/>

        </Routes>
        
      </div>
      <HomePage/>
      <Footer/>
    </Router>
  );
}

export default App;

/*
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="users/*" element={<Users />} />
  <Routes>
<BrowserRouter>
*/