import React, { useState, useEffect } from 'react'
import authSvg from '../assests/reset.svg'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { isAuth } from '../helpers/auth'
import { Redirect, useHistory } from 'react-router-dom'

const ResetPassword = ({match}) => {
  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
    token: '',
    textChange: 'Submit'
  })

  const history = useHistory()

  const { password1, password2, textChange, token } = formData
  
  useEffect(() => {
    let token = match.params.token
    if(token) {
      setFormData({...formData, token,})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params])

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if ((password1 === password2) && password1 && password2) {
      setFormData({ ...formData, textChange: 'Submitting' })
      axios.put(`${process.env.REACT_APP_API_URL}/resetpassword`, {
        newPassword: password1,
        resetPasswordToken: token
      })
      .then(res => {
          setFormData({
            ...formData,
            password1: '',
            password2: '',
            textChange: 'Submitted'
          })
          setTimeout(() => {
            toast.success(res.data.message)
          },1000)
          history.push('/login')
      })
      .catch(err => {
        toast.error(err.response.data.error)
      })
    } else {
      toast.error('Passwords don\'t matches')
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
              Reset Your Password
            </h1>
            <div className='w-full flex-1 mt-8 text-indigo-500'>
              
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <input
                  className='input-field'
                  type='password'
                  placeholder='password'
                  onChange={handleChange('password1')}
                  value={password1}
                  />
                  <input
                  className='input-field mt-5'
                  type='password'
                  placeholder='Confirm password'
                  onChange={handleChange('password2')}
                  value={password2}
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

export default ResetPassword
