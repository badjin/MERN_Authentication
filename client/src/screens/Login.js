import React, { useState, useEffect } from 'react'
import authSvg from '../assests/auth.svg'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { authenticate, isAuth } from '../helpers/auth'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import googleLogo from '../assests/google-icon.svg'

const Login = () =>  {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    textChange: 'Sign In'
  })

  useEffect(() => {
    setFormData({...formData, 
      email: '',
      password: '',
      textChange: 'Sign In'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const history = useHistory()

  const { email, password, textChange } = formData 

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value })
  }

  // Send google token
  const sendGoogleToken = (token) => {
    axios.post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
      idToken: token
    }).then((res) => {
      authenticate(res, () => {
        setTimeout(() => {
          toast.success(`Hey ${res.data.user.name}, Welcome back!`)
        },1000)
        isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')            
      })
    }).catch((err) => {
      toast.error(err.response.data.error)
    })
  }

  const responseGoogle = (response) => {
    sendGoogleToken(response.tokenId);
  };


  const handleSubmit = e => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please fill all fields")
      return
    }

    setFormData({ ...formData, textChange: 'Submitting' })
    
    axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email,
      password
    })
    .then(res => {
      authenticate(res, () => {
        setFormData({
          ...formData,
          email: '',
          password: '',
          textChange: 'Submitted'
        })
        setTimeout(() => {
          toast.success(`Hey ${res.data.user.name}, Welcome back!`)
        },1000)
        isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
      })
    })
    .catch(err => {
      setFormData({
        ...formData,
        email: '',
        password: '',
        textChange: 'Sign In'
      })
      toast.error(err.response.data.error)
    })
  }

  return (
    <div className='bj-content'>
      {isAuth() && <Redirect to='/' /> }
      <ToastContainer />
      <div className='bj-container'>
        <div className='lg:w-1/2 xl:w-5/12 p-3 sm:p-6'>
          <div className='mt-4 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Sign In
            </h1>
            <div className='w-full flex-1 mt-8 text-indigo-500'>
              <div className='flex flex-col items-center'>
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='btn-shadow'
                    >
                      <img className="h-6 w-6 mr-1" src={googleLogo} alt="GoogleLogo" />                      
                      <span className='ml-4'>Sign In with Google</span>
                    </button>
                  )}
                />
                <a
                  className='btn-shadow mt-5'
                  href='/register'
                  target='_self'
                >
                  <i className='fas fa-user-plus fa 1x w-6 -ml-2 text-indigo-500' />
                  <span className='ml-4'>Sign Up</span>
                </a>
              </div>
              <div className='my-6 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or sign In with e-mail
                </div>
              </div>
              <form
                className='mx-auto max-w-xs relative'
                onSubmit={handleSubmit}
              >
                <input
                  className='input-field mt-4'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <input
                  className='input-field mt-5'
                  type='password'
                  placeholder='Password'
                  onChange={handleChange('password')}
                  value={password}
                />
                <button
                  type='submit'
                  className='btn btn-submit mt-5'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>{textChange}</span>
                </button>
                <Link
                  to='/users/password/forget'
                  className='no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2'
                >
                  Forget password?
                </Link>
              </form>
            </div>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Login
