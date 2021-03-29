import React, { Suspense, useEffect, useState } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

import { updateLoginUser, logoutUser, getBgImagesFromUnsplash, getSettings } from './redux'

import PrivateRoute from './routes/PrivateRoute'
import AdminRoute from './routes/AdminRoute'
import GuestOnlyRoute from './routes/GuestOnlyRoute'

import Register from './pages/auth/Register'
import Activation from './pages/auth/Activation'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'

import Admin from './pages/admin/UserList'
import EditUserInfo from './pages/admin/EditUserInfo'

import Profile from './pages/user/Profile'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

import NavBar from './components/Navbar'
import Footer from './components/Footer'

import { getLoginInfo } from './helpers/auth'
import SiteConfig from './pages/admin/SiteConfig'


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
        dispatch(updateLoginUser(res.data))
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
    dispatch(getSettings())
    .then(res => {
      dispatch(getBgImagesFromUnsplash(res.theme))
    })
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
          <AdminRoute condition={isAuth} exact path="/admin/users" component={Admin} />
          <AdminRoute condition={isAuth} exact path="/admin/settings" component={SiteConfig} />
          <AdminRoute condition={isAuth} exact path="/admin/users/:id" component={EditUserInfo} />

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
