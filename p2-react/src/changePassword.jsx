import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import './App.css';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        this.state = {
            lista: [{ password: ""
            }], user: {password: ''}}

        this.handleChange = this.handleChange.bind(this)
        this.changePlace = this.changePlace.bind(this)
        this.submitForm = this.submitForm.bind(this)

    }
    submitForm (e) {
        e.preventDefault()
        if (this.props.history){
            this.props.history.push('/userpage'); // <--- The page you want to redirect your user to.

        }
      }
    


    changePlace() {
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        const loggedInUser = localStorage.getItem("currentUser");
        var result = loggedInUser.substring(1, loggedInUser.length-1);
        var url = 'http://localhost:3003/users/'+result
        
        axios.put(url, this.state.user )
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState((state) => {
                        return {
                            lista: [...state.lista, state.user],
                            user: {password: ''},
                            redirectToReferrer: true // Vamos usar essa flag pra redirecionar para outra página quando o login for bem sucedido
                        }
                    })
                }
                console.log(resp)
            })
            .catch(erro => console.log(erro))
    }


    handleChange(event) {
        var handleState = (state, event) => {
            state.user[event.target.name] = event.target.value
            console.log(state)
           // var cidade = state.user[0]
            console.log(this.state)
            return state
        }
        console.log(this.state)

        this.setState(handleState(this.state, event))
    }

    refreshPage() {
        window.location.reload(false);
      }
      
refresh = () => {
    this.setState({
        redirectToReferrer: true
    })
   }


    render() {
        // if (this.state.redirectToReferrer === true) {
        //     return (
        //         <Redirect to= "/weather"  />
        // )}

 


        return (
            <div class="form__group">

                <input type="text"
                    name="password"
                    class = 'form__input'
                    placeholder = "New password"
                    // value={this.state.user.password}
                    onChange={this.handleChange} 
                    />
                    <br></br>
                <form onSubmit={this.submitForm}>
                <button 
                type="submit"
                onClick={
                    this.changePlace}
                >Change Password
                
                </button>
                </form>

      
                

            </div>
        )
        if (this.state.redirectToReferrer === true) {
            return (
                <Redirect to= "/weather"  />
        )}
    }
}