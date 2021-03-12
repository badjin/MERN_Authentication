import React, { useState } from 'react'
import authSvg from '../assests/auth.svg'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { isAuth } from '../helpers/auth'
import { Redirect, Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    textChange: 'Sign Up'
  })

  const { name, email, password, confirmPassword, textChange } = formData

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password) {
      if (password === confirmPassword) {
        setFormData({ ...formData, textChange: 'Submitting' })   
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            password: password
          })
          .then(res => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              textChange: 'Submitted'
            })
            toast.success(res.data.message)
          })
          .catch(err => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              textChange: 'Sign Up'
            })
            toast.error(err.response.data.error)
          })
      } else {
        toast.error("Passwords don't matches")
      }
    } else {
      toast.error("Please fill all fields")
    }
  }

  return (
    <div className='jcontainer items-center'>
      {isAuth() && <Redirect to='/' />}
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-6 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Sign Up
            </h1>

            <form
              className='w-full flex-1 mt-8 text-indigo-500'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                <input
                  className='input-field'
                  type='text'
                  placeholder='Name'
                  onChange={handleChange('name')}
                  value={name}
                />
                <input
                  className='input-field mt-5'
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
                <input
                  className='input-field mt-5'
                  type='password'
                  placeholder='Confirm Password'
                  onChange={handleChange('confirmPassword')}
                  value={confirmPassword}
                />
                <button
                  type='submit'
                  className='btn btn-submit mt-5'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>{textChange}</span>
                </button>
              </div>
              <div className='my-6 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or sign with email or social login
                </div>
              </div>
              <div className='flex flex-col items-center mb-8'>
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
