import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import '../App.css';
import Navbar from "../Navbar";
import { Route } from 'react-router-dom'
import Weather from './weather'
import Home from './home'
import Postlist from "../posts/postlist";
import Geolocation from './geolocation'

export default class WeatherPage extends Component {
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
        this.props.history.push('/weather-page'); // <--- The page you want to redirect your user to.
      }
    


    changePlace() {
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.post('http://localhost:3003/place', this.state.city )
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState((state) => {
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
                <Redirect to= "/weather-page"  />
        )}

        const place = localStorage.getItem("currentCity");
        var result = place.substring(1, place.length-1);


      

 


        return (
            <div>

            <div class='header_weather'>
        <h1>{result}</h1>
            <h1 class='title_login'>Weather</h1>
            <Navbar/>
                </div>
                    
            <div class="form__group">
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
                >Change Place
                
                </button>

                </form>
                <Geolocation/>

            </div>
            <div >
            <Weather/>
            
            </div>        
            </div>
            )
        if (this.state.redirectToReferrer === true) {
            return (
                <Redirect to= "/weather"  />
        )}
    }
}