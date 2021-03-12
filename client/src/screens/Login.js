import React from 'react'
import { useForm } from "react-hook-form"
import authSvg from '../assests/auth.svg'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { authenticate, isAuth } from '../helpers/auth'
import { Link, Redirect } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import googleLogo from '../assests/google-icon.svg'

const Login = ({history}) =>  {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    axios
    .post(`${process.env.REACT_APP_API_URL}/login`, data)
    .then(res => {      
      authenticate(res, () => {        
        setTimeout(() => {
          toast.success(`Hey ${res.data.user.name}, Welcome back!`)
        },1000)
        isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
      })
    })
    .catch(err => {      
      toast.error(err.response.data.error)
    })
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
    sendGoogleToken(response.tokenId)
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
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  name='email'
                  className='input-field mt-4'
                  type='email'
                  placeholder='Email'
                  ref={register({ 
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                  })}
                />
                { errors.email && 
                  errors.email.type === "required" && <p className='text-sm text-red-500 pl-4'> This email field is required</p>}
                { errors.email && 
                  errors.email.type === "pattern" && <p className='text-sm text-red-500 pl-4'> Please provide a valid email</p>}

                <input
                  name='password'
                  className='input-field mt-5'
                  type='password'
                  placeholder='Password'
                  ref={register({ required: true, minLength: 8 })}
                />
                {!errors.email && 
                  errors.password && errors.password.type === "required" && <p className='text-sm text-red-500 pl-4'> This password field is required</p>}
                {!errors.email && 
                  errors.password && errors.password.type === "minLength" && <p className='text-sm text-red-500 pl-4'> Password must have at least 8 characters</p>}

                <button
                  type='submit'
                  className='btn btn-submit mt-5'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Sign In</span>
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
