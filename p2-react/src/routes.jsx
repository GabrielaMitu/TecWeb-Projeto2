import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Weather from './weather/weather'
import City from './weather/city'
import Usuarios from './usuarios'
import Cadastro from './cadastro'
import Login from './login'
import Home from './weather/home'
import Postlist from './posts/postlist'
import Geolocation from './weather/geolocation'
import WeatherPage from './weather/weatherPage'
import CityPage from './weather/cityPage'
import UserPage from './userpage'
import Recommendations from './weather/recommendations'
import Activities from './weather/activities'


//import Teste from './usuarios/teste'

export default props => (
    <Router>
        {/* <Route exact path='/' component={Weather} /> */}
        <Route path='/weather' component={Weather} />
        <Route path='/city' component={City} />
        <Route path='/usuarios' component={Usuarios} />
        <Route path='/cadastro' component={Cadastro}/>
        <Route path='/login' component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/postlist' component={Postlist} />
        <Route path='/geolocation' component={Geolocation} />
        <Route path='/weather-page' component={WeatherPage} />
        <Route path='/userpage' component={UserPage} />
        <Route path='/city-page' component={CityPage} />
        <Route path='/recommendations' component={Recommendations} />
        <Route path='/suggestions' component={Activities} />

        {/* <Route path='/teste' component={Teste} /> */}
        {/* <Redirect from='*' to='/weather' /> */}
    </Router>
)