import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Register from './screens/Register';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact render={props => <App {...props} /> } />
      <Route path='/register' exact render={props => <Register {...props} /> } />
    </Switch>  
  </BrowserRouter>,
  document.getElementById('root')
);
