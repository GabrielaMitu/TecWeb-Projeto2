import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import { Link } from 'react-router-dom';

class Navbar extends React.Component{
  
    render() {
        return (
          
          <nav>
            <div>
              <ul id="nav">
                <li>
                <a  href="/weather-page" >Weather</a>
                </li>
                <li>
                <a  href="/city-page" >Cidade</a>
                </li>
                <li>
                <a  href="/recommendations" >Recommendations</a>
                </li>
                
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div class="dropdown">
                <a class="dropbtn" href="/userpage"><i class="fa fa-fw fa-user"></i> 
                <div class="dropdown-content">
                  <a href="/userpage" > <i class="fa fa-gear">  Config</i></a>
                  <a  href="/login" >Logout</a>

                </div>
                </a>
                </div>

              </ul>
            </div>
            </nav>
        );
    }
}

export default Navbar;
