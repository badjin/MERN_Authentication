import React, { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'

import { getLoginInfo } from '../helpers/auth'
import InputValidate from '../components/InputValidate'
import { updateUserData } from '../redux'

import SidePanel from '../components/SidePanel'

const EditUserInfo = ({ match, history }) => {
  const users = useSelector(state => state.admin.users)
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, errors, setValue, clearErrors } = useForm()

  const [user, setUser] = useState('')
  const [isFieldChanged, setIsFieldChanged] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    const index = match.params.id
    if(index && users.length) {
      setUser(users[index])
      const { name, email } = user
      setFormData({ ...formData, name, email })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value })
  }

  const onSubmit = (data) => {
    console.log(data)

  }

  return (
    // <div className='flex items-center'>
    //   <div className="mr-2 text-gray-500">{user.email}</div>
    //   <div className="text-gray-900 uppercase text-3xl font-bold">{user.name}</div>    
    // </div>
    <div className='bj-container'>
      <div className='lg:w-1/2 xl:w-5/12 p-3 sm:p-6'>
        <div className='my-4 flex flex-col items-center'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            Edit User Information
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
                value={user.email}
              />
              <div className="flex items-center justify-between mt-5">                
                <label className="w-32 flex flex-col items-center rounded-lg tracking-wide  cursor-pointer has-tooltip">                  
                  <img className=" w-12 h-12 rounded-full transform hover:scale-110" src={`${process.env.REACT_APP_API_URL}/uploads/${user.avatar}`} alt="Profile"/>
                  <span className="tooltip text-center  w-24 text-xs mt-14 bg-gray-600 text-gray-100 px-1 absolute rounded bg-opacity-50 ">Update user's profile image</span>
                
                  <input ref={register} type='file' name='profileImage' className="hidden" accept='image/*'/>
                </label>
                <input
                  name='name'
                  className='input-field ml-5'
                  type='text'
                  placeholder='Name'
                  onChange={handleChange('name')}
                  value={user.name}
                  ref={register({ required: true, minLength: 3 })}
                />
                {errors.name && 
                <InputValidate filedName='name' type={errors.name.type} />}
              </div>
              
              <div className="flex justify-between space-x-2">
                <button
                  type='submit'
                  disabled={!isFieldChanged}
                  className='btn btn-submit mt-5'
                >
                  <i className={`fas fa-user-plus fa 1x w-6 ${(!isFieldChanged) && 'text-gray-400'} -ml-2`} />
                  <span className={`ml-3 ${(!isFieldChanged) && 'text-gray-400'}`}>Update</span>
                </button>
                <button
                  className='btn btn-submit mt-5'
                  onClick={() => {
                    history.push('/admin')
                  }}
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2' />
                  <span className='ml-3'>Go to List</span>
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

export default EditUserInfo
