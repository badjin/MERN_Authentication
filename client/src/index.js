import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter } from 'react-router-dom'
import App from './App'

import { Provider } from 'react-redux'
import Store from './redux/store'

ReactDOM.render(
  <Provider store={ Store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
