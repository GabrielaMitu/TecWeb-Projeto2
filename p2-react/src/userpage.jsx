import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import './App.css';
import { Route } from 'react-router-dom'
import Navbar from "./Navbar";
import ChangePassword from "./changePassword";
import DeleteAccount from "./deleteAccount";


export default class UserPage extends Component {
    constructor(props) {
        super(props)
        // Inicializando o State com alguns valores para testarmos
        this.state = {lista: [
            
        ]}
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        const loggedInUser = localStorage.getItem("currentUser");
        var result = loggedInUser.substring(1, loggedInUser.length-1);

        var url = 'http://localhost:3003/user/'+result
        console.log(url)
        console.log(result)
        axios.get(url)
            .then(resp => {
                if(Math.floor(resp.status/100) === 2) { // Checa se o response status code é 2XX (sucesso)
                    this.setState({lista: resp})
                    return;
                }
                console.log(resp.body)
                console.log("resp")
                console.log(resp.json())

        })
        .catch(erro => console.log(erro))

       // this.handleChange = this.handleChange.bind(this)
    //    this.cadastrar = this.cadastrar.bind(this)
    }

    submitForm (e) {
        e.preventDefault()
        if (this.props.history){
            this.props.history.push('/weather-page'); // <--- The page you want to redirect your user to.
        }}

    render() {
        const loggedInUser = localStorage.getItem("currentUser");
        const currentStatus = localStorage.getItem("currentStatus");
        
        var user = this.state.lista.data
        // var tempos = this.state.lista.data
        var userinfo =''
        var username=''
        var password=''
    
        if (user){
            userinfo = user["0"]
            console.log(user)
            console.log(userinfo)
            username=userinfo["username"]
            password=userinfo["password"]

    
        }
        
        return (
            <div >
                <Navbar/>
                <h1 class="title_login">Hello, {username}!</h1>
                <h2>Change Password</h2>
                <h4>Current password: {password}</h4>
                {/* <h4>Status: {currentStatus}</h4> */}
                <ChangePassword/>
                <DeleteAccount/>

            </div>)}
}