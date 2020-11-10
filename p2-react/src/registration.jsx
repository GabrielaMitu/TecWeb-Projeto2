import logo from './logo.svg';
// import React from 'react';
// import './App.css';
import Routes from './routes'
import Navbar from "./Navbar";
import Axios from 'axios'
import React, {Component, useEffect, useState, Redirect } from "react";



 const Register =()=> {
  
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

//   const register = () =>{
//       Axios.post('http://localhost:3003/register', {
//           username: usernameReg, 
//           password: passwordReg
//         }).then(resp => {
//             console.log(resp);
//          });
//   };
  return  (
    <div className="App">
      <header className="App-header">
      <Navbar/>
        <h1>Weather Travel Application</h1>
        <input 
            type = "text" 
            placeholder = "email"
            onChange={(e)=>{
                setUsernameReg(e.target.value);
        }  }/>
        <input 
            type = "text" 
            placeholder = "password"
            onChange={(e)=>{
                setPasswordReg(e.target.value);
        }  }/>
        {/* <button onClick={register}>Register</button> */}
        <Redirect to='http://localhost:3000/registration'/>

       
      </header>
    </div>
  );
}

export default Register;

//https://www.youtube.com/watch?v=HPIjjFGYSJ4