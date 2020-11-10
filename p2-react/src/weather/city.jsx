import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import Home from './home'
import Navbar from "../Navbar";
import '../App.css';
import Geolocation from './geolocation'
import Postscity from "../posts/postscity";

export default class City extends Component {

    constructor(props) {
        super(props)
        // Inicializando o State com alguns valores para testarmos
        this.state = {lista: [
            
        ]}
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3003/city')
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

      
    }


render() {


    var tempos = this.state.lista

    console.log(this.state)
    var place
    if (tempos.data){
        console.log(this.state.lista.data)
        place = this.state.lista.data["name"]
        console.log(place)
        localStorage.setItem("currentCity",JSON.stringify(place));

    }

    return (
<div>
        <div className="Table"> 
       <h1>{place}</h1>

             {/* ===================== */}
                {/* HOW TO USE IT         */}
                {/* ===================== */}
                <JsonToTable json={tempos.data} />
                {/* ===================== */}


                
        </div>
                <Postscity/>

        </div>
     );
}
}