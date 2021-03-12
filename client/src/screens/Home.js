import React from 'react'
import { Link } from 'react-router-dom'
import { signout } from '../helpers/auth'
import { ToastContainer, toast } from 'react-toastify'

const Home = ({ history }) => {
  return (
    <div className='jcontainer'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-8/12 p-6 sm:p-12'>
          <div className='mt-4 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-2xl font-extrabold  text-center '>
              Ultimate Auth with Email & Google with diferent roles,
              email verification & Forget passwored{' '}
            </h1>
            <div className='w-full flex-1 text-indigo-500'>
              <div className='my-8 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Features
                </div>
              </div>
              <div className='mx-auto max-w-xs relative '>
                <Link
                  to='/login'
                  className='btn mt-5 bg-indigo-500 text-gray-100 hover:bg-indigo-700'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Sign In</span>
                </Link>
                <Link
                  to='/register'
                  className='btn mt-5 bg-gray-500 text-gray-100 hover:bg-gray-700'
                >
                  <i className='fas fa-user-plus  w-6  -ml-2' />
                  <span className='ml-3'>Sign Up</span>
                </Link>
                <Link
                  to='/private'
                  className='btn mt-5 bg-yellow-500 text-gray-100 hover:bg-yellow-700'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Profile Dashbaord</span>
                </Link>
                <Link
                  to='/admin'
                  className='btn mt-5 bg-green-500 text-gray-100 hover:bg-green-700 '
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Admin Dashbaord</span>
                </Link>
                <button
                  onClick={() => {
                    signout(() => {
                      toast.error('Signout Successfully');
                      history.push('/')
                    })
                  }}
                  className='btn mt-5 bg-pink-500 text-gray-100 hover:bg-pink-700'
                >
                  <i className='fas fa-sign-out-alt  w-6  -ml-2' />
                  <span className='ml-3'>Signout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Home
