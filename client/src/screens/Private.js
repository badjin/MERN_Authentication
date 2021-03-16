import React, { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form"
import authSvg from '../assests/update.svg'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { updateUser, isAuth, getCookie } from '../helpers/auth'
import InputValidate from '../components/InputValidate'

const Private = ({ history }) => {
  const { register, handleSubmit, watch, errors, setValue, clearErrors } = useForm()
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [isNameChanged, setIsNameChanged] = useState(false)
  const [isPasswordEnable, setIsPasswordEnable] = useState(false)
  const [isPasswordChange, setIsPasswordChange] = useState(false)


  const { name, email } = formData
  const password = useRef()
  password.current = watch("password")

  useEffect(() => {    
    setIsNameChanged(name !== isAuth().name)
  }, [name])

  useEffect(() => {    
    setIsPasswordChange(isPasswordEnable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isPasswordEnable])

  useEffect(() => {
    loadProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadProfile = () => {
      const { name, email } = isAuth()
      setFormData({ ...formData, name, email })
    // const token = getCookie('token')
    // axios.get(`${process.env.REACT_APP_API_URL}/user/${isAuth().id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //   .then(res => {
    //     const { name, email } = res.data.user
    //     setFormData({ ...formData, name, email })
    //   })
    //   .catch(err => {
    //     setTimeout(() => {
    //       toast.error(`Error To Your Information ${err.response.statusText}`)
    //     },1000)
    //     if (err.response.status === 401) {
    //       signout(() => {
    //         history.push('/login')
    //       })
    //     }
    //   })
  }


  const onSubmit = (data) => {
    setValue('password', undefined)
    setValue('ConfirmPpassword', undefined)
    clearErrors('password')
    clearErrors('ConfirmPpassword')

    let payload = {}
    if(isPasswordChange) payload = {name: data.name, password: data.password}
    else payload = {name: data.name}

    const token = getCookie('token')

    axios
    .put(`${process.env.REACT_APP_API_URL}/user/update`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {      
      updateUser(res, () => {
        toast.success('Profile Updated Successfully')
      })
    })
    .catch(err => {      
      toast.error(err.response.data.error)
    })
  }

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value })
  }
  

  return (
    <div className='bj-container'>
      <ToastContainer />
      <div className='lg:w-1/2 xl:w-5/12 p-3 sm:p-6'>
        <div className='my-4 flex flex-col items-center'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            Profile Update
          </h1>

          <form
            className='w-full my-6 flex-1 text-indigo-500'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='mx-auto max-w-xs relative '>                
              <input
                disabled
                className='input-field text-gray-400'
                type='email'
                placeholder='Email'
                onChange={(e) => e.target.value}
                value={email}
              />
              <input
                name='name'
                className='input-field mt-5'
                type='text'
                placeholder='Name'
                onChange={handleChange('name')}
                value={name}
                ref={register({ required: true, minLength: 3 })}
              />
              {errors.name && 
              <InputValidate filedName='name' type={errors.name.type} />}

              <button
                className='btn-shadow mt-5'
                onClick={(e) => {
                  e.preventDefault()
                  if(!isPasswordEnable) {
                    setValue('password', undefined)
                    setValue('ConfirmPpassword', undefined)
                    clearErrors('password')
                    clearErrors('ConfirmPpassword')
                  }
                  setIsPasswordEnable(!isPasswordEnable)
                }}
              >
                <i className={`fas ${isPasswordEnable ? 'fa-unlock' : 'fa-lock'} fa 1x w-6  -ml-2`} />
                <span className='ml-3'>Password Change</span>
              </button>

              <input
                name='password'
                className={`input-field mt-5 ${!isPasswordEnable && 'hidden'}`}
                type='password'
                placeholder='Password'
                ref={
                  register(
                    isPasswordEnable 
                    ? { required: true, minLength: 8 }
                    : {}
                  )
                }
              />
              {!errors.name && errors.password && isPasswordEnable &&
              <InputValidate filedName='password' type={errors.password.type} />}

              <input
                name='ConfirmPpassword'
                className={`input-field mt-5 ${!isPasswordEnable && 'hidden'}`}
                type='password'
                placeholder='Confirm Password'
                ref={
                  register(
                    isPasswordEnable 
                    ? { 
                        required: true,
                        validate: (value) => value === password.current
                      }
                    : {}
                  )
                }
              />
              {!errors.name && !errors.password && errors.ConfirmPpassword && isPasswordEnable &&
              <InputValidate filedName='confirm password' type={errors.ConfirmPpassword.type} />}
              <div className="flex justify-between space-x-2">
                <button
                  type='submit'
                  disabled={!isNameChanged && !isPasswordChange}
                  className='btn btn-submit mt-5'
                >
                  <i className={`fas fa-user-plus fa 1x w-6 ${(!isNameChanged && !isPasswordChange) && 'text-gray-400'} -ml-2`} />
                  <span className={`ml-3 ${(!isNameChanged && !isPasswordChange) && 'text-gray-400'}`}>Update</span>
                </button>
                <button
                  className='btn btn-submit mt-5'
                  onClick={() => {
                    history.push('/')
                  }}
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2' />
                  <span className='ml-3'>Home</span>
                </button>
              </div>
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

export default Private
