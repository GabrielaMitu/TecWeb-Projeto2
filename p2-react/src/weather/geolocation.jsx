import React, { Component } from 'react'
import axios from 'axios'


export default class Geolocation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
    }
  }

  position = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => this.setState({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      }, newState => console.log(newState)), 
      err => console.log(err), () => {
        console.log(this.state);
    }
    );
    console.log(this.state.latitude)
    console.log(this.state)

    

    if (this.state){
        var s =  this.state.latitude+","+this.state.longitude
        console.log(s)
        var json = {City : s}
        axios.post('http://localhost:3003/place', json)
            
                console.log(this.state)

                }
    
    };

  render() {
    return (
      <div>
        <button onClick={this.position} className='Filter'>Current Location</button>
      </div>
    );
  }
}

