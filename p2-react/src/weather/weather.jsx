import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import Home from './home'
import Navbar from "../Navbar";
import Postlist from "../posts/postlist";
import Geolocation from './geolocation'
import '../App.css';


export default class Weather extends Component {

    constructor(props) {
        super(props)
        // Inicializando o State com alguns valores para testarmos
        this.state = {lista: [
            
        ]}
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3003/weather')
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
// handleChange(event) {
//     var handleState = (state, event) => {
//         state.usuario[event.target.city] = event.target.value
//         return state
//     }
//     this.setState(handleState(this.state, event))
// }

render() {


    // if (this.state.redirectToReferrer === true) {
    //     return (
    //         <Redirect to="/weather"/>
    //     )
    // }

    var tempos = this.state.lista.data
    
    // console.log(tempos.obj1)
    


    //var tempo = Array.from(ar.data);
    console.log(this.state)
    console.log(this.state.lista.obj1)

    //var obj = JSON.parse(tempos.data)
    //console.log(obj)
    // var litempo = tempos.map(tempo => {
    //     return (
    //         <li key={tempo}>{tempo}</li>
    //     )
    // })
    var urlimg;
    if(typeof tempos !== "undefined"){
        console.log(tempos['obj1'])
        var p = tempos['obj1']
        var bkgr = tempos['obj2']
        var place = tempos['obj3']
        urlimg = "url('"+bkgr+ "');"
        // const image = document.getElementById("img");
        // image.src=urlimg
        localStorage.setItem("currentCity",JSON.stringify(place));

        console.log(urlimg)

    }else{
        var p =tempos
        urlimg = "url('https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fwww.webcis.com.br%2Fredimensionando-background-com-css3-background-size.html&psig=AOvVaw0vU8wv70-pvjW7lBr2xyvL&ust=1604337651227000&source=images&cd=vfe&ved=2ahUKEwjS89bP7eHsAhXKJrkGHaErDJIQjRx6BAgAEAc');"

    }
            return (
            <div class='div'>
            {/* <Navbar/> */}
                {/* <style> #div{ 'background-image': 'url'({bkgr})}; </style> */}
                <div >
                    
                    <img src = {bkgr} class = 'imagem' id = "image" alt="weather" width="320" height="220"/>

                </div>
                <div className="Table"> 
                <h1>{place}</h1>
                    {/* ===================== */}
                        {/* HOW TO USE IT         */}
                        {/* ===================== */}
                        <JsonToTable json={p} />
                        {/* ===================== */}

                </div>
                <div  className = "posts">
                <h1>How's the weather there?</h1>
                <Postlist/>
                </div>
            </div>
            );
}} 