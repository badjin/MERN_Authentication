import React, { useState, useEffect } from 'react';
import authSvg from '../assests/welcome.svg'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { authenticate, isAuth } from '../helpers/auth'
import { useHistory } from 'react-router-dom'

function Activation({match}) {
  const [formData, setFormData] = useState({
    name: '',
    token: ''
  })

  const history = useHistory()

  useEffect(() => {
    let token = match.params.token
    let { name } = jwt.decode(token)

    if (token) {
      setFormData({ ...formData, name, token })
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params])

  const { name, token } = formData

  const handleSubmit = e => {
    e.preventDefault()

    axios.post(`${process.env.REACT_APP_API_URL}/activation`, { token })
      .then(res => {
        authenticate(res, () => {
          setTimeout(() => {
            toast.success(res.data.message)
          },1000)
          isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')            
        })
        // toast.success(res.data.message)
      })
      .catch(err => {        
        console.log(err.response)
        toast.error(err.response.data.error)
      })
  }

  return (
    <div className='bj-container'>
      <ToastContainer />
      <div className='lg:w-1/2 xl:w-5/12 p-3 sm:p-6'>
        <div className='my-4 flex flex-col items-center'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            Welcome {name}
          </h1>

          <form
            className='w-full flex-1 my-8 text-indigo-500'
            onSubmit={handleSubmit}
          >
            <div className='mx-auto max-w-xs relative '>
              <button
                type='submit'
                className='btn btn-submit mt-5'
              >
                <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                <span className='ml-3'>Activate</span>
              </button>
            </div>
            <div className='my-6 border-b text-center'>
              <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                Or sign up again
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <a
                className='btn-shadow mt-5'
                href='/register'
                target='_self'
              >
                <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                <span className='ml-4'>Sign Up</span>
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

export default Activation
