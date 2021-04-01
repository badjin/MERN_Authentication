import React, { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { getLoginInfo } from '../../helpers/auth'
import { updateProfile } from '../../redux'
import InputValidate from '../../components/InputValidate'
import SidePanel from '../../components/SidePanel'

const Profile = ({ history }) => {
  const user = useSelector(state => state.user.userData)
  const dispatch = useDispatch()

  const { 
    register, 
    handleSubmit, 
    watch, 
    errors, 
    setValue, 
    clearErrors,
    reset,
    formState
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: user.email,
      name: user.name,
      password: '',
      confirmPassword: '',
      avatar: ''
    }
  })
  const [isFiledChanged, setIsFieldChanged] = useState(false)
  const [isPasswordEnable, setIsPasswordEnable] = useState(false)

  const password = useRef()
  password.current = watch("password")

  useEffect(() => {
    let nameAndAvatar = (formState.dirtyFields.name || formState.dirtyFields.avatar) ? true : false
    let pw = password.current ? true : false
    let pwError = (formState.errors.password || formState.errors.confirmPassword)
    setIsFieldChanged(nameAndAvatar || (pw && !pwError))
  }, [formState])

  const onSubmit = (data) => {
    let payload = {}
    if(!password.current){
      payload = {
        name: data.name, 
        avatar: (data.avatar.length ? data.avatar[0].name : ''),
        password: ''
      }
    }
    else {
      payload = {
        name: data.name, 
        avatar: (data.avatar.length ? data.avatar[0].name : ''),
        password: data.password
      } 
    }

    let sendData = new FormData()
    sendData.append('id', user.id)
    sendData.append('name', payload.name)
    sendData.append('avatar', payload.avatar)
    sendData.append('password', payload.password)
    sendData.append('profileImage', data.avatar[0])
    
    dispatch(updateProfile(sendData, getLoginInfo().token))
    .then(res => {
      setIsPasswordEnable(false)
      reset(data)
      toast.success('Profile Updated Successfully')
    })
    .catch(error => toast.error(error.response.data.error))
  }

  return (
    <div className='bj-container'>
      <div className='flex-1 bg-indigo-100 hidden lg:flex'>
        <SidePanel />        
      </div>
      <div className='lg:w-1/2 xl:w-5/12 p-3 sm:p-6'>
        <div className='my-4 flex flex-col items-center'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            Profile Update
          </h1>

          <form
            className='w-full my-6 flex-1 text-indigo-500'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='mx-auto max-w-xs'>                
              <input
                disabled
                className='input-field text-gray-400'
                type='email'
                placeholder={user.email}
              />
              <div className="flex items-center justify-between mt-5">                
                <label className="w-32 flex flex-col items-center rounded-lg tracking-wide  cursor-pointer has-tooltip">                  
                  <img className="w-12 h-12 rounded-full object-cover" src={`${process.env.REACT_APP_PROFILE_URL}/${user.avatar}`} alt="Profile"/>
                  <span className="tooltip text-center  w-24 text-xs mt-14 bg-gray-600 text-gray-100 px-1 absolute rounded bg-opacity-50 ">Upload your profile image</span>
                
                  <input type='file' name='avatar' className="hidden" accept='image/*' ref={register} />
                </label>
                <input
                  name='name'
                  className='input-field ml-5'
                  type='text'
                  placeholder='Name'
                  ref={register({ required: true, minLength: 3 })}
                />
              </div>
              {errors.name && 
                <InputValidate filedName='name' type={errors.name.type} />}
              {!user.googleAccount && 
                <button
                  className={'btn-shadow mt-5'}
                  onClick={() => {
                    setValue('password', '')
                    setValue('confirmPassword', '')
                    clearErrors('password')
                    clearErrors('ConfirmPassword')
                    setIsPasswordEnable(!isPasswordEnable)
                  }}
                >
                  <i className={`fas ${isPasswordEnable ? 'fa-unlock' : 'fa-lock'} fa 1x w-6  -ml-2`} />
                  <span className='ml-3'>Password Change</span>
                </button>
              }

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
                name='confirmPassword'
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
              {!errors.name && !errors.password && errors.confirmPassword && isPasswordEnable &&
              <InputValidate filedName='confirmPassword' type={errors.confirmPassword.type} />}
              <div className="flex justify-between space-x-2">
                <button
                  type='submit'
                  disabled={!isFiledChanged}
                  className='btn btn-submit mt-5'
                >
                  <i className={`fas fa-edit fa 1x w-6 ${!isFiledChanged && 'text-gray-400'} -ml-2`} />
                  <span className={`ml-3 ${!isFiledChanged && 'text-gray-400'}`}>Update</span>
                </button>
                <button
                  className='btn mt-5 bg-pink-500 text-gray-100 hover:bg-pink-700'
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
    </div>
  )
}

export default Profile
