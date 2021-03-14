import React, { useRef } from 'react'
import { useForm } from "react-hook-form"
import authSvg from '../assests/auth.svg'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { isAuth } from '../helpers/auth'
import { Redirect, Link } from 'react-router-dom'
import InputValidate from '../components/InputValidate'

const Register = () => {  
  const { register, handleSubmit, watch, errors } = useForm()
  const password = useRef()
  password.current = watch("password")

  const onSubmit = (data) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}/register`, data)
    .then(res => {      
      toast.success(res.data.message)
    })
    .catch(err => {      
      toast.error(err.response.data.error)
    })
  } 

  return (
    <div className='bj-content'>
      {isAuth() && <Redirect to='/' />}
      <ToastContainer />
      <div className='bj-container'>
        <div className='lg:w-1/2 xl:w-5/12 p-3 sm:p-6'>
          <div className='mt-4 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Sign Up
            </h1>

            <form
              className='w-full flex-1 mt-6 text-indigo-500'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='mx-auto max-w-xs relative '>
                <input
                  name='name'
                  className='input-field'
                  type='text'
                  placeholder='Name'
                  ref={register({ required: true, minLength: 3 })}
                />
                {errors.name && 
                <InputValidate filedName='name' type={errors.name.type} />}
                
                <input
                  name='email'
                  className='input-field mt-5'
                  type='email'
                  placeholder='Email'
                  ref={register({ 
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                  })}
                />
                {!errors.name && errors.email && 
                <InputValidate filedName='email' type={errors.email.type} />}

                <input
                  name='password'
                  className='input-field mt-5'
                  type='password'
                  placeholder='Password'
                  ref={register({ required: true, minLength: 8 })}
                />
                {!errors.name && !errors.email && errors.password && 
                <InputValidate filedName='password' type={errors.password.type} />}

                <input
                  name='ConfirmPpassword'
                  className='input-field mt-5'
                  type='password'
                  placeholder='Confirm Password'
                  ref={register({
                    required: true,
                    validate: (value) => value === password.current
                  })}
                />
                {!errors.name && !errors.email && !errors.password && errors.ConfirmPpassword && 
                <InputValidate filedName='confirm password' type={errors.ConfirmPpassword.type} />}

                <button
                  type='submit'
                  className='btn btn-submit mt-5'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>Sign Up</span>
                </button>
              </div>
              <div className='my-6 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or sign with email or social login
                </div>
              </div>
              <div className='flex flex-col items-center mb-6'>
                <Link
                  className='btn-shadow mt-5'
                  to='/login'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>Sign In</span>
                </Link>
              </div>
            </form>
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

export default Register
