import React from 'react';
import Header from './compnents/Header';
import Home from './pages/Home/Home';
import { BrowserRouter, Router, Route } from 'react-router-dom';

const Root = () => {
    return (
      <div>
        <Header/>
        <Home />
      </div>
    );
}



export default Root;