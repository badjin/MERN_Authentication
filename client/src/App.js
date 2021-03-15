import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import PrivateRoute from './Routes/PrivateRoute'
import AdminRoute from './Routes/AdminRoute'
import Register from './screens/Register'
import Activation from './screens/Activation'
import Login from './screens/Login'
import Home from './screens/Home'
import ForgotPassword from './screens/ForgotPassword'
import ResetPassword from './screens/ResetPassword'
import Private from './screens/Private'
import Admin from './screens/Admin'
import NavBar from './components/Navbar'
import About from './screens/About'
import Contact from './screens/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div className='bj-content'>
        <Switch>
          <Route exact path='/' render={props => <Home {...props} /> } />
          <Route exact path='/register' render={props => <Register {...props} /> } />
          <Route exact path='/login' render={props => <Login {...props} />} />
          <Route exact path='/users/activate/:token' render={props => <Activation {...props} />} />
          <Route exact path='/users/password/forget' render={props => <ForgotPassword {...props} />} />
          <Route exact path='/users/password/reset/:token' render={props => <ResetPassword {...props} />} />
          <Route exact path='/about' render={props => <About {...props} />} />
          <Route exact path='/contact' render={props => <Contact {...props} />} />
          <PrivateRoute exact path="/private" component={Private} />
          <AdminRoute exact path="/admin" component={Admin} />
          <Redirect to='/' />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  )
}

export default App;
