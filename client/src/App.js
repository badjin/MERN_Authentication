import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'

import { updateLoginUser, logoutUser, getBgImagesFromUnsplash, getSettings } from './redux'

import PrivateRoute from './Routes/PrivateRoute'
import AdminRoute from './Routes/AdminRoute'
import GuestOnlyRoute from './Routes/GuestOnlyRoute'

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
  const [loading, setLoading] = useState(true)
  const [loginCheck, setLoginCheck] = useState(false)

  const contextClass = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  }

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
      .then(res => {
        setLoading(false)
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    setLoginCheck(false)
    checkTokenExpired()
    setLoginCheck(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location])

  return (
    <>
      <NavBar />
      {loading ? (
        <div className='bj-content items-center'>
          <BeatLoader color='green' loading={loading} />
        </div>
        ) : (
        <div className='bj-content'>
          <ToastContainer className='mt-11'
            toastClassName={({ type }) => contextClass[type || "default"] + 
              " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
            }
            bodyClassName={() => "text-sm font-white font-med block p-3"}
            position="top-right"
            autoClose={3000}
          />
          { loginCheck && 
            <Switch>
              <GuestOnlyRoute exact path='/register' component={Register} />
              <GuestOnlyRoute exact path='/login' component={Login} />
              <GuestOnlyRoute exact path='/users/activate/:token' component={Activation} />
              <GuestOnlyRoute exact path='/users/password/forget' component={ForgotPassword} />
              <GuestOnlyRoute exact path='/users/password/reset/:token' component={ResetPassword} />
              
              <PrivateRoute exact path="/profile" component={Profile} />
              <AdminRoute exact path="/admin/users" component={Admin} />
              <AdminRoute exact path="/admin/settings" component={SiteConfig} />
              <AdminRoute exact path="/admin/users/:id" component={EditUserInfo} />

              <Route exact path='/about' render={props => <About {...props} />} />
              <Route exact path='/contact' render={props => <Contact {...props} />} />
              <Route exact path='/' render={props => <Home {...props} /> } />

              <Redirect to='/' />
            </Switch>
          }
          
        </div>
        )       
      }
      <Footer />
    </>
  )
}

export default App
