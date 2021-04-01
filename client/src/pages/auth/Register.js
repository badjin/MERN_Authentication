import React, { useRef } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { registerUser } from '../../redux'
import InputValidate from '../../components/InputValidate'
import SidePanel from '../../components/SidePanel'

const Register = () => { 
  const dispatch = useDispatch()

  const { register, handleSubmit, watch, errors } = useForm()
  const password = useRef()
  password.current = watch("password")

  const onSubmit = (data) => {
    dispatch(registerUser(data))
    .then(res => toast.success(res))
    .catch(error => {
      toast.error(error)
    })
  } 

  return (
    <div className='bj-container'>
      <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
        <SidePanel />
      </div>
      <div className='lg:w-1/2 xl:w-5/12 p-3 sm:p-6'>
        <div className='my-4 flex flex-col items-center'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            Sign Up
          </h1>
          <div className='w-full flex-1 my-4 text-indigo-500'>
            <form
              className='mx-auto max-w-xs relative'
              onSubmit={handleSubmit(onSubmit)}
            >             
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
              
              <div className='my-2 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or sign with email or social login
                </div>
              </div>
              <div className='flex flex-col items-center'>
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
      </div>
    </div>
  )
}

export default Register
