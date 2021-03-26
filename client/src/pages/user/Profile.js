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

  const { register, handleSubmit, watch, errors, setValue, clearErrors } = useForm()
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  })
  const [isNameChanged, setIsNameChanged] = useState(false)
  const [isAvatarChanged, setIsAvatarChanged] = useState(false)
  const [isPasswordEnable, setIsPasswordEnable] = useState(false)
  const [isPasswordChange, setIsPasswordChange] = useState(false)

  const password = useRef()
  password.current = watch("password")

  // Password Input area toggle
  useEffect(() => {    
    setIsPasswordChange(isPasswordEnable)
  }, [isPasswordEnable])

  // Loading Loged in user's info
  useEffect(() => {

    const { name, email } = user
    setFormData({ ...formData, name, email })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const onSubmit = (data) => {
    setValue('password', undefined)
    setValue('ConfirmPpassword', undefined)
    clearErrors('password')
    clearErrors('ConfirmPpassword')

    let payload = {}
    if(!isPasswordChange){
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
      setIsNameChanged(false)
      setIsAvatarChanged(false)
      setIsPasswordChange(false)
      setIsPasswordEnable(false)
      toast.success('Profile Updated Successfully')
    })
    .catch(error => toast.error(error.response.data.error))
  }

  return (
    <div className='bj-container'>
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
                placeholder={user.email}
              />
              <div className="flex items-center justify-between mt-5">                
                <label className="w-32 flex flex-col items-center rounded-lg tracking-wide  cursor-pointer has-tooltip">                  
                  <img className=" w-12 h-12 rounded-full transform hover:scale-110" src={`${process.env.REACT_APP_API_URL}/uploads/${user.avatar}`} alt="Profile"/>
                  <span className="tooltip text-center  w-24 text-xs mt-14 bg-gray-600 text-gray-100 px-1 absolute rounded bg-opacity-50 ">Upload your profile image</span>
                
                  <input type='file' name='avatar' className="hidden" accept='image/*'
                    onChange={ e => setIsAvatarChanged(e.target.files[0].name)} 
                    ref={register} 
                  />
                </label>
                <input
                  name='name'
                  className='input-field ml-5'
                  type='text'
                  placeholder='Name'
                  onChange={e => {
                    setIsNameChanged(e.target.value !== user.name)
                    setFormData({ ...formData, name: e.target.value })
                  }}
                  value={formData.name}
                  ref={register({ required: true, minLength: 3 })}
                />
                {errors.name && 
                <InputValidate filedName='name' type={errors.name.type} />}
              </div>
              
              {!user.googleAccount && 
                <button
                  className={'btn-shadow mt-5'}
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
                  disabled={!isNameChanged && !isAvatarChanged && !isPasswordChange}
                  className='btn btn-submit mt-5'
                >
                  <i className={`fas fa-user-plus fa 1x w-6 ${(!isNameChanged && !isAvatarChanged && !isPasswordChange) && 'text-gray-400'} -ml-2`} />
                  <span className={`ml-3 ${(!isNameChanged && !isAvatarChanged && !isPasswordChange) && 'text-gray-400'}`}>Update</span>
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
      <div className='flex-1 bg-indigo-100 hidden lg:flex'>
        <SidePanel />        
      </div>
    </div>
  )
}

export default Profile
