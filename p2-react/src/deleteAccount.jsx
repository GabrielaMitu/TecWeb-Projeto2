import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import './App.css';

export default class DeleteAccount extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        this.state = {
            lista: [{ username: "",password: ""
            }], user: {username:'',password: ''}}

        this.handleChange = this.handleChange.bind(this)
        this.changePlace = this.changePlace.bind(this)
    }
    submitForm (e) {
        e.preventDefault()
        if (this.props.history){
            this.props.history.push('/login'); // <--- The page you want to redirect your user to.

        }
      }
    


    changePlace() {
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        const loggedInUser = localStorage.getItem("currentUser");
        var result = loggedInUser.substring(1, loggedInUser.length-1);
        var url = 'http://localhost:3003/users/'+result
        
        axios.delete(url, this.state.user )
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState((state) => {
                        return {
                            lista: [...state.lista, state.user],
                            user: {username:'',password: ''},
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
            // console.log(cidade)
            return state
        }

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
        return (
            <div class="form__group">
                <button 
                type="submit"
                onClick={
                    this.changePlace}
                >Delete Account
                
                </button>
            </div>
        )
      
    }
}