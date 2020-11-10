import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class Usuarios extends Component {

constructor(props) {
    super(props)
    // Inicializando o State com alguns valores para testarmos
    this.state = {lista: [
        {username: 'mrbrightside'},
        {username: 'jenny'}
    ], usuario: {username: ''}}
    // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
    this.handleChange = this.handleChange.bind(this)
    this.cadastrar = this.cadastrar.bind(this)

}

cadastrar() {
    axios.post('http://localhost:3003/userlist', this.state.usuario)
        .then(resp => {
            if(Math.floor(resp.status/100) === 2) {
                this.setState((state) => {
                    return {
                        lista: [...state.lista, state.usuario],
                        usuario: {username: ''}
                    }
                })
                return;
            }
            console.log(resp)
            return <Redirect to="/weather" />
        })
        .catch(erro => console.log(erro))
}

// event.target representa o elemento que causou o trigger do evento que chamou o método (no caso, será o input do username)
handleChange(event) {
var handleState = (state, event) => {
    state.usuario[event.target.name] = event.target.value
    return state
}

this.setState(handleState(this.state, event))
}

render() {
var usuarios = this.state.lista
console.log(this.state)
var liUsuarios = usuarios.map(usuario => {
    return (
        <li key={usuario.username}>{usuario.username}</li>
    )
})
return (
    <div>
        <ul>
            <p>
                <label>Username     </label>
                <input name="username"
                    value={this.state.usuario.username}
                    onChange={this.handleChange}/>
            </p>
            <p>
                <button onClick={this.cadastrar}>Registrar</button>
            </p>
        </ul>
    </div>
)
}
}