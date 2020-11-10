import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import '../App.css';
import Navbar from "../Navbar";
import { Route } from 'react-router-dom'


export default class Home extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        this.state = {
            lista: [{ name: ""
            }], city: {name: ''}}

        this.handleChange = this.handleChange.bind(this)
        this.changePlace = this.changePlace.bind(this)
    }
    submitForm (e) {
        e.preventDefault()
        if (this.props.history){
            this.props.history.push('/recommendations'); // <--- The page you want to redirect your user to.

        }
      }
    


    changePlace() {
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.post('http://localhost:3003/place', this.state.city )
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                  
                    this.setState((state) => {
                        console.log(state.lista)
                       
                        return {
                            lista: [...state.lista, state.city],
                            city: {name: ''},
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
            state.city[event.target.name] = event.target.value
            console.log(state)
           // var cidade = state.city[0]
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
        if (this.state.redirectToReferrer === true) {
            return (
                <Redirect to= "/weather"  />
        )}

        
        console.log(this.lista)

        // 

 


        return (
            <div class="form__group">
                <h1 class="title_login">Welcome</h1>
                <h4 class="title_login">Choose a place to start</h4>

                <input type="text"
                    name="City"
                    class = 'form__input'
                    placeholder = "City Name"
                    // value={this.state.city.name}
                    onChange={this.handleChange} 
                    />
                    <br></br>
                <form onSubmit={this.submitForm.bind(this)}>
                <button 
                type="submit"
                onClick={
                    this.changePlace}
                >Choose Place
                
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