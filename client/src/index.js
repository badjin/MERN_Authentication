import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Register from './screens/Register'
import Activation from './screens/Activation'
import Login from './screens/Login'


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact render={props => <App {...props} /> } />
      <Route path='/register' exact render={props => <Register {...props} /> } />
      <Route path='/login' exact render={props => <Login {...props} />} />
      <Route path='/users/activate/:token' exact render={props => <Activation {...props} />} />
    </Switch>  
  </BrowserRouter>,
  document.getElementById('root')
);
