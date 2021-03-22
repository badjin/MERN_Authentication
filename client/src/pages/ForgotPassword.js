import React from 'react'
import { useForm } from "react-hook-form"
import authSvg from '../assests/sergey-shmidt-koy6FlCCy5s-unsplash.jpg'
import { toast } from 'react-toastify'
import axios from 'axios'
import InputValidate from '../components/InputValidate'

const ForgetPassword = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}/forgotpassword`, data)
    .then(res => {      
      toast.success(res.data.message)
    })
    .catch(err => {      
      toast.error(err.response.data.error)
    })
  } 
  

  return (    
    <div className='bj-container'>
      <div className='lg:w-1/2 xl:w-5/12 p-3 sm:p-6'>
        <div className='my-4 flex flex-col items-center'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            Forget Password
          </h1>
          <div className='w-full flex-1 my-8 text-indigo-500'>
            
            <form
              className='mx-auto max-w-xs relative '
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
      <div
          className='w-full bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${authSvg})` }}
        >
          <div className="flex flex-col justify-end h-full absoluteinset-0 bg-gray-900 bg-opacity-30">            
            <h1 className='p-12 text-xl text-gray-100 tracking-wide'>The elegant beauty of roses can be enjoyed just about anywhere with these miniature versions. Excellent for small garden spaces and grows happily in pots outdoors or in a sunny window. Blooms throughout the summer into autumn. The flowers can be cut just like larger roses to create quaint miniature flower arrangements.</h1>
            
          </div>
        </div>        
      </div>
    </div>
  )
}

export default ForgetPassword
