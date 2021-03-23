import React, { Suspense, useEffect, useState } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

import { updateUserData, logoutUser, setBgImages } from './redux'

import PrivateRoute from './routes/PrivateRoute'
import AdminRoute from './routes/AdminRoute'
import GuestOnlyRoute from './routes/GuestOnlyRoute'

import Register from './pages/Register'
import Activation from './pages/Activation'
import Login from './pages/Login'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import About from './pages/About'
import Contact from './pages/Contact'

import NavBar from './components/Navbar'
import Footer from './components/Footer'

import { getLoginInfo } from './helpers/auth'


const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [isAuth, setIsAuth] = useState('false')

  const checkTokenExpired = async () => {    
    const loginInfo = getLoginInfo()
    if(!loginInfo) return false 

    try {
      //check if token has expired
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/${loginInfo.id}`, {
        headers: {
            Authorization: `Bearer ${loginInfo.token}`
        }
      })
      if (res) {
        setIsAuth(true)   
        dispatch(updateUserData(res.data))
        return true
      }
      return false
    } catch (error) {
      dispatch(logoutUser())
      .then(() => toast.error(error.response.data.error))
      return false
    }
  }  

  useEffect(() => {
    dispatch(setBgImages())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    checkTokenExpired()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location])

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div className='bj-content'>
        <ToastContainer className='mt-11' />
        <Switch>
          <GuestOnlyRoute condition={isAuth} exact path='/register' component={Register} />
          <GuestOnlyRoute condition={isAuth} exact path='/login' component={Login} />
          <GuestOnlyRoute condition={isAuth} exact path='/users/activate/:token' component={Activation} />
          <GuestOnlyRoute condition={isAuth} exact path='/users/password/forget' component={ForgotPassword} />
          <GuestOnlyRoute condition={isAuth} exact path='/users/password/reset/:token' component={ResetPassword} />
          
          <PrivateRoute condition={isAuth} exact path="/profile" component={Profile} />
          <AdminRoute condition={isAuth} exact path="/admin" component={Admin} />

          <Route exact path='/about' render={props => <About {...props} />} />
          <Route exact path='/contact' render={props => <Contact {...props} />} />
          <Route exact path='/' render={props => <Home {...props} /> } />

          <Redirect to='/' />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  )
}

export default App
