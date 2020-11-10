import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import Home from './home'
import Navbar from "../Navbar";
import Postlist from "../posts/postlist";
import Geolocation from './geolocation'
import '../App.css';


export default class Activities extends Component {

    constructor(props) {
        super(props)
        // Inicializando o State com alguns valores para testarmos
        this.state = {lista: [
            
        ]}
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3003/suggested')
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


    
    var tempos = this.state.lista.data
    
    console.log(this.state)
    console.log(this.state.lista.obj1)

    var urlimg;
    var cold;
    var rain;
    var warm;

    var ttdc = '';
    var ttdr ='';
    var ttdw ='';

    var cc = '';
    var cr ='';
    var cw ='';

    var ic = '';
    var ir ='';
    var iw ='';

    var atividades ='';
    var roupas ='';
    var imagem ='';
    var cor

    if(typeof tempos !== "undefined"){
        var warm = tempos['warm']
        var rain = tempos['rain']
        var cold = tempos['cold']
        // var bkgr = 

        // urlimg = "url('"+bkgr+ "');"
        // const image = document.getElementById("img");
        // image.src=urlimg
        // localStorage.setItem("currentCity",JSON.stringify(place));
        ttdc = cold["activities"];
        ttdr = rain["activities"];
        ttdw = warm["activities"];

        cc = cold["clothes"];
        cr = rain["clothes"];
        cw = warm["clothes"];

        ic = cold["img"];
        ir = rain["img"];
        iw = warm["img"];


        console.log(warm)
        console.log(cold)
        console.log(rain)

        var chegou = this.props.status
            console.log(chegou)

        if (( typeof this.props.status !== "undefined") && (typeof this.props.status != "0")){
            var chegou = this.props.status
            console.log(chegou)

            if (chegou === "warm"){
                 atividades =ttdw;
                 roupas =cw;
                 imagem =iw;
                 cor= "orange"
            }else if (chegou === "cold"){
                atividades =ttdc;
                roupas =cc;
                imagem =ic;
                cor= "blue"
            }else if (chegou === "rain"){
                atividades =ttdr;
                roupas =cr;
                imagem =ir;
                cor = "grey"
            }

        }

        

    }else{
        var p =tempos
        urlimg = "url('https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fwww.webcis.com.br%2Fredimensionando-background-com-css3-background-size.html&psig=AOvVaw0vU8wv70-pvjW7lBr2xyvL&ust=1604337651227000&source=images&cd=vfe&ved=2ahUKEwjS89bP7eHsAhXKJrkGHaErDJIQjRx6BAgAEAc');"

    }


    const fontStyle = () => ({
        color: cor,
        
      });
      

    

            return (
            <div class='divisao'>
            {/* <Navbar/> */}
                {/* <style> #div{ 'background-image': 'url'({bkgr})}; </style> */}
                <div >
                    <h1 class='temp' style={ fontStyle()}>It's {chegou}!</h1>
                    
                    <img src = {imagem} class = 'imagem' id = "image" alt="weather" width="320" height="220"/>

                </div>
                <div > 
                <h2 class='temp' style={ fontStyle()}>What to do?</h2>
                        {/* ===================== */}
                        <JsonToTable json={atividades} />
                        {/* ===================== */}

                </div>

                <div > 
                <h2 class='temp' style={ fontStyle()}>What to wear?</h2>
                        {/* ===================== */}
                        <JsonToTable json={roupas} />
                        {/* ===================== */}

                </div>
                
            </div>
            );
}} 