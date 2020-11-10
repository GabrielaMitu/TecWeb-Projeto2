import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import './Posts.css';

export default class Postsactivities extends Component {

    constructor(props) {
        super(props)
        const nomeusuario = localStorage.getItem("username");
        const place = localStorage.getItem("currentCity");

        var result = nomeusuario.substring(1, nomeusuario.length-1);
        if (place){
            var resultplace = place.substring(1, place.length-1);

        console.log(place)
            console.log(resultplace)

        }

        // Inicializando o State com alguns valores para testarmos
        this.state = {lista: [
            {username: 'mrbrightside', content: 'oi', date: "2020-11-02T19:18:51.373Z", city: "Nulles"},
        ], post: {username: result, content: '', date: '', city: resultplace}}

        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3003/postlistactivities'
        , {
            params: {
              city: resultplace
            }})
            .then(resp => {
                if(Math.floor(resp.status/100) === 2) { // Checa se o response status code é 2XX (sucesso)
                    this.setState({lista: resp.data})
                    return;
                }
                console.log(resp)
        })
        .catch(erro => console.log(erro))

         this.handleChange = this.handleChange.bind(this)
         this.cadastrar = this.cadastrar.bind(this)
        //  this.incStatus = this.incStatus.bind(this)

    }


    cadastrar() {
        const nomeusuario = localStorage.getItem("username");

        axios.post('http://localhost:3003/addpostactivities', this.state.post)
            .then(resp => {
                if(Math.floor(resp.status/100) === 2) {
                    this.setState((state) => {
                        return {
                            lista: [...state.lista, state.post],
                            post: {content: ''},
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
        state.post[event.target.name] = event.target.value
        return state
    }
    this.setState(handleState(this.state, event))
}



render() {

   
   
    var posts = this.state.lista
    console.log(this.state)
    var liposts = posts.map(post => {
        return (
            
            <ul>
            <li key={post.date}>{"Date: "+ (post.date).slice(0, 10) +" - Time: "+ (post.date).slice(11, 16)}</li>
            <li key={post.username}>{post.username}</li>
            <li key={post.content}>{post.content}</li>
            </ul>
        )
    })


    var postsReverse = posts.reverse();
    console.log(postsReverse)
    var lipostsReverse = postsReverse.map(postReverse => {
        
        
        return (
    
            
            <ul>
            <li key={postReverse.date}>{"Date: "+ (postReverse.date).slice(0, 10) +" - Time: "+ (postReverse.date).slice(11, 16)}</li>
            <li key={postReverse.username}>{postReverse.username}</li>
            <li key={postReverse.content}>{postReverse.content}</li>
            </ul>
        )
    })


    var lista
    var tag
    if (this.state.inputValue === "0"){
        lista = lipostsReverse
        tag = "Least recent"
    }else{
        lista = liposts
        tag = "Most recent"

    }



    return (
        <div>
        <div>
        <h1>Things to do</h1>

            <p >
                    <input 
                    placeholder = "New Comment" 
                    class = 'form_posts' 
                    name="content"
                    // value={this.state.post.username}
                    onChange={this.handleChange}

                        />
                </p>
                <form onSubmit={this.incStatus}>
                <p>
                    <button
                    type="submit"
                    onClick={this.cadastrar}>Send</button>
                </p>
            </form>
        </div>
        Sort by:      <input
        type="button"
        name="someName"
        value={tag}
        onClick={() =>
         this.state.inputValue === "0"
         ? this.setState({
         inputValue: "1"
         })
         : 
        this.setState({
        inputValue: "0"
        })
        }
         className="btn btn-success"
      />
        <div>
            <ul> {lista} </ul><p></p>
            {/* <JsonToTable json={posts} /> */}   
        </div>
        </div>
    )
}
}