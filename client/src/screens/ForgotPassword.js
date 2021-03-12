import React, { useState } from 'react'
import authSvg from '../assests/forget.svg'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
// import { text } from 'express'
import { isAuth } from '../helpers/auth'
import { Redirect } from 'react-router-dom'

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    textChange: 'Submit'
  })

  const { email, textChange } = formData

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'Submitting' })
      axios
        .post(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
          email
        })
        .then(res => {
          
            setFormData({
              ...formData,
              email: '',
              textChange: 'Submitted'
            })
            toast.success(res.data.message)
          
        })
        .catch(err => {
          toast.error(err.response.data.error)
        })
    } else {
      toast.error('Please fill all fields')
    }
  }

  return (
    <div className='jcontainer'>
      {isAuth() && <Redirect to='/' />}
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Forget Password
            </h1>
            <div className='w-full flex-1 mt-8 text-indigo-500'>
              
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <input
                  className='input-field'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <button
                  type='submit'
                  className='btn btn-submit mt-5'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>{textChange}</span>
                </button>
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

export default ForgetPassword
