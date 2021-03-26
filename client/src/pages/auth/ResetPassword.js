import React, { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import axios from 'axios'

import InputValidate from '../../components/InputValidate'
import SidePanel from '../../components/SidePanel'

const ResetPassword = ({match, history}) => {
  const [ token, setToken ] = useState('')
  const { register, handleSubmit, watch, errors } = useForm()
  const password = useRef()
  password.current = watch("password")

  const onSubmit = (data) => {
    axios
    .put(`${process.env.REACT_APP_API_URL}/resetpassword`, {
      newPassword: data.password,
      resetPasswordToken: token
    })
    .then(res => {    
      toast.success(res.data.message)
      history.push('/login')
    })
    .catch(err => {
      toast.error(err.response.data.error)
    })
  } 
  
  useEffect(() => {
    const token = match.params.token
    if(token) {
      setToken(token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className='bj-container'>
      <div className='lg:w-1/2 xl:w-5/12 p-3 sm:p-6'>
        <div className='my-4 flex flex-col items-center'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            Reset Your Password
          </h1>
          <div className='w-full flex-1 my-8 text-indigo-500'>
            
            <form
              className='mx-auto max-w-xs relative '
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                name='password'
                className='input-field mt-5'
                type='password'
                placeholder='Password'
                ref={register({ required: true, minLength: 8 })}
              />
              {errors.password && 
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
              {!errors.password && errors.ConfirmPpassword && 
              <InputValidate filedName='confirm password' type={errors.ConfirmPpassword.type} />}

              <button
                type='submit'
                className='btn btn-submit mt-5'
              >
                <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                <span className='ml-3'>Submit</span>
              </button>
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

export default ResetPassword
