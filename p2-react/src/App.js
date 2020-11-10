import logo from './logo.svg';
import React from 'react';
import './App.css';
import Routes from './routes'
import Navbar from "./Navbar";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './weather/home'


function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        
        {/* <h1>Weather API</h1> */}
        <Router>
        {/* <Home/> */}

        <br/>
        <Routes />

        {/* <Route path='/weather' component={Weather} /> */}
        </Router>
        
      </header>
    </div>
  );
}


export default App;
