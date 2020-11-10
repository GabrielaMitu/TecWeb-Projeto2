import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import Home from './home'
import Navbar from "../Navbar";
import Postsactivities from "../posts/postsactivities";
import Geolocation from './geolocation'
import '../App.css';
import './chart.css'
import Activities from './activities';
// import state.usuario from '../login'

export default class Recommendations extends Component {
    constructor(props) {
        super(props)
        // Inicializando o State com alguns valores para testarmos
        this.state = {lista: [
            
        ]}
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3003/recommendations')
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
       this.cadastrar = this.cadastrar.bind(this)
    }

    cadastrar() {
        axios.post('http://localhost:3003/weather', this.state.local)
            .then(resp => {
                if(Math.floor(resp.status/100) === 2) {
                    this.setState((state) => {
                        return {
                            lista: [...state.lista, state.local],
                            local: {local: ''},
                            redirectToReferrer: true // Vamos usar essa flag pra redirecionar para outra página quando o login for bem sucedido
                        }
                    })
                }
                console.log(resp)
            })
            .catch(erro => console.log(erro))
    }

   // event.target representa o elemento que causou o trigger do evento que chamou o método (no caso, será o input do username)
handleChange(event) {
    var handleState = (state, event) => {
        state.usuario[event.target.city] = event.target.value
        return state
    }
    this.setState(handleState(this.state, event))
}

render() {

    // if (this.state.redirectToReferrer === true) {
    //     return (
    //         <Redirect to="/weather"/>
    //     )
    // }

    var tempos = this.state.lista.data
    
    


    console.log(this.state)
    console.log(tempos)

    var city ="oi"
    var weather_description 
    var windspeed 
    var uv_index 
    var is_day 

    var uv_rec
    var uv_val
    var uv_color
    var uv_indexrel
    var uv_str2
    var uvstr
    var percentage

    var wind_rec
    var wind_val
    var wind_color
    var windspeedrel
    var wind_str2
    var windstr
    var percentage_wind

    var warningtext=''

    var urlimg
    var bkgr
    var temperature
    var status = "0"

    const loggedInUser = localStorage.getItem("currentUser");




    // var urlimg;
    if((typeof tempos !== "undefined") ){
        temperature = tempos.temperature

        if (temperature<=16){
            status = "cold"
        }else {
            status = "warm"
        }

       city = tempos.city
       weather_description = (tempos["weather_description"]).toString()
       windspeed = (tempos["windspeed"])
       uv_index = (tempos["uv_index"])
       is_day = (tempos["is_day"])

       localStorage.setItem("currentCity",JSON.stringify(city));


       uv_indexrel=(10-uv_index)*10
       percentage = (uv_index*10).toString()+"%"
       uv_str2=uv_indexrel.toString()
       uvstr=uv_index.toString()


       

       windstr=windspeed.toString() + "km/h"
        
        
        console.log(city)
        console.log(weather_description)
        console.log(windspeed)
        console.log(uv_index)
        console.log(is_day)

        console.log(this.state.usuario)

        if (windspeed<12){
            wind_val = "LOW".fontcolor("green")
            wind_color = "green"
            wind_rec = "Light breeze. Perfect fot outdoor activities!"
            percentage_wind = "33%"

        }else if (windspeed<25){
            wind_val = "MODERATE"
            wind_color = "yellow"
            wind_rec = "Moderate wind/ Strong breeze"
            percentage_wind = "66%"

        }else{
            wind_val = "HIGH"
            wind_color = "red"
            wind_rec = "Strong gales. Be careful! Or go windsurfing..."
            percentage_wind = "100%"

        }
        

        if (uv_index<3){
            uv_val = "LOW".fontcolor("green")
            uv_color = "green"
            uv_rec = "No need to worry about sunscreen"
        }else if (uv_index<6){
            uv_val = "MODERATE"
            uv_color = "yellow"
            uv_rec = "Moderate UV index"
        }else{
            uv_val = "HIGH"
            uv_color = "red"
            uv_rec = "Don't forget to wear sunscreen!!!"

        }
        if (is_day.includes("yes")){
            urlimg = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8o7i7qmrkp8e2Jneynhz_82Wrg4dytetvLA&usqp=CAU"
        }else{
            urlimg = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLDgJS1FUkI1M3yXdr72kFLF72Jab4gSflUQ&usqp=CAU"

            
        }


        var warning
        var warning2
        var warning3

        if ( (weather_description.includes("Rain")) || (weather_description.includes("rain"))) {
            warning = "Don't forget your umbrella!"
            status = "rain"
        }if (windspeed>=50){
            warning2 = "Hurricane"
        }if (uv_index>=9){
            warning3 = "UV index is too HIGH!"
        }

        if((typeof warning !== "undefined") ){
            warningtext+=warning
        }if((typeof warning2 !== "undefined") ){

            warningtext+=("||"+warning2)
        }if((typeof warning3 !== "undefined") ){
            warningtext+=("||"+warning3)
        }

    }

    const uvStyle = () => ({
        // width: `200px`,
        backgroundColor: uv_color,
        width: percentage
      });


      const windStyle = () => ({
        // width: `200px`,
        backgroundColor: wind_color,
        width: percentage_wind
        
      });

      const warningStyle = () => ({
        // width: `200px`,
        backgroundColor: "red",
        font: "white"
      });


/////////////////////////CHART

            return (
                
            <div class='div'>

            <Navbar/>
                {/* <style> #div{ 'background-image': 'url'({bkgr})}; </style> */}
                <div>
                    <h1>{city}</h1>
                    <h2 style={ warningStyle()}> {warningtext}</h2>

                    <div>
                        {/* <p>{loggedInUser}</p> */}
                    

                </div>

                <div class='divisao2'>
                <img src = {urlimg} id = "image" alt="weather" width="320" height="220"/>


                    <h3> {weather_description}</h3>
                    <h4> Temperature: {temperature} C</h4>


                    <h5 >UV index: {uv_index}</h5>
                    <p>{uv_rec}</p>
                    <div class="container"> 
                        <div class="skill html"  style={ uvStyle()}>{uvstr}</div> 
                    </div> 

                    <h5 >Windspeed: {windspeed}</h5>
                    <p>{wind_rec}</p>
                    <div class="container"> 
                        <div class="skill html"  style={ windStyle()}>{windstr}</div> 
                    </div> 

                    </div>
        
                </div>

                <div> 
                    <Activities status={status}/>

                </div>
                <Postsactivities/>

                
            </div>
            );
}}