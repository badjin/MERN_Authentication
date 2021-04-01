import React from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import emailjs from 'emailjs-com'
import InputValidate from '../components/InputValidate'
import SidePanel from '../components/SidePanel'

const Contact = ({ history }) => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID, 
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID, 
      data, 
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then((result) => {
      toast.success('Sent your message successfully')
      history.push('/')
    }, (error) => {
      toast.error(error.text)
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
            Contact
          </h1>
          <div className='w-full flex-1 my-6 text-indigo-500'>
            <form
              className='mx-auto max-w-xs'
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

              <textarea
                name='message'
                className='form-textarea mt-5 p-2 rounded-lg border-2  block w-full'
                rows="8"
                placeholder='Enter your message'
                ref={register({ required: true, minLenth:8 })}
              ></textarea>
              {!errors.name && !errors.email && errors.message &&
              <InputValidate filedName='message' type={errors.message.type} />}

              <button
                  type='submit'
                  className='btn btn-submit mt-5'
                >
                  <i className='fas fa-envelope fa 1x w-6  -ml-2' />
                  <span className='ml-3'>Send Message</span>
                </button>             
              
            </form>
          </div>
        </div>
      </div>
      {/* <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
        <SidePanel />   
      </div> */}
    </div>
  )
}

export default Contact
