import React from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'

import { authenticate } from '../../helpers/auth'
import googleLogo from '../../assests/google-icon.svg'
import InputValidate from '../../components/InputValidate'
import SidePanel from '../../components/SidePanel'
import { loginUser } from '../../redux'

const Login = () =>  {
  const dispatch = useDispatch()
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()

  const setAuth = (res) => {
    authenticate(res, () => {
      toast.success(`Hey ${res.user.name}, Welcome back!`)
      history.push('/')
      // if(res.success && res.user.role === 'admin') history.push('/admin/users')
      // else history.push('/')
    })
  }

  const onSubmit = (data) => {
    
    dispatch(loginUser(data, 'login'))
    .then((res) => setAuth(res))
    .catch((error) => toast.error(error))    
  } 

  const responseGoogle = (response) => {
    dispatch(loginUser({idToken: response.tokenId}, 'googlelogin'))
    .then((res) => setAuth(res))
    .catch((error) => toast.error(error))
  }

  return (
    <div className='bj-container'>
      <div className='lg:w-1/2 xl:w-5/12 p-3 sm:p-6'>
        <div className='my-4 flex flex-col items-center'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            Sign In
          </h1>
          <div className='w-full flex-1 my-6 text-indigo-500'>
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
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                })}
              />
              {errors.email && 
              <InputValidate filedName='email' type={errors.email.type} />}

              <input
                name='password'
                className='input-field mt-5'
                type='password'
                placeholder='Password'
                ref={register({ required: true, minLength: 8 })}
              />
              {!errors.email && errors.password && 
              <InputValidate filedName='password' type={errors.password.type} />}

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
        <SidePanel /> 
      </div>
    </div>
  )
}

// const mapStateToProps = ({user}) => {
//   return {
//     user
//   }
// }

// const mapDispatchToProps = {  
//   loginUser  
// }

export default Login
