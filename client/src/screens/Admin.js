import React, { useState, useEffect } from 'react'
import authSvg from '../assests/update.svg'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth'

const Admin = ({ history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    textChange: 'Update',
    role: ''
  })

  useEffect(() => {
    loadProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadProfile = () => {
    const token = getCookie('token')
    axios.get(`${process.env.REACT_APP_API_URL}/user/${isAuth().id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const { role, name, email } = res.data.user;
        setFormData({ ...formData, role, name, email })
      })
      .catch(err => {
        setTimeout(() => {
          toast.error(`Error To Your Information ${err.response.statusText}`)
        },1000)
        if (err.response.status === 401) {
          signout(() => {
            history.push('/login')
          })
        }
      })
  }

  const { name, email, password1, textChange, role } = formData
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value })
  }

  const handleSubmit = e => {
    const token = getCookie('token')
    e.preventDefault()
    setFormData({ ...formData, textChange: 'Submitting' })
    axios.put(`${process.env.REACT_APP_API_URL}/admin/update`, {
        name,
        email,
        password: password1
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        updateUser(res, () => {
          toast.success('Profile Updated Successfully')
          setFormData({ ...formData, textChange: 'Update' })
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  return (    
    <div className='bj-container'>
      <ToastContainer />
      <div className='lg:w-1/2 xl:w-5/12 p-3 sm:p-6'>
        <div className='my-4 flex flex-col items-center'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            Admin Update
          </h1>

          <form
            className='w-full flex-1 my-6 text-indigo-500'
            onSubmit={handleSubmit}
          >
            <div className='mx-auto max-w-xs relative '>
              <input
                disabled
                className='input-field text-gray-400'
                type='text'
                placeholder='Role'
                value={role}
              />
              <input
                className='input-field text-gray-400 mt-5'
                type='email'
                placeholder='Email'
                disabled
                value={email}
              />
              <input
                className='input-field mt-5'
                type='text'
                placeholder='Name'
                onChange={handleChange('name')}
                value={name}
              />

              <input
                className='input-field mt-5'
                type='password'
                placeholder='Password'
                onChange={handleChange('password1')}
                value={password1}
              />
              <button
                type='submit'
                className='btn btn-submit mt-5'
              >
                <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                <span className='ml-3'>{textChange}</span>
              </button>
            </div>
            <div className='my-4 border-b text-center'>
              <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                Go To Home
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <a
                className='btn-shadow mt-5'
                href='/'
                target='_self'
              >
                <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                <span className='ml-4'>Home</span>
              </a>
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
  )
}

export default Admin
