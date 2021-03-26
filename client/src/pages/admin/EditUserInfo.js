import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { getLoginInfo } from '../../helpers/auth'
import InputValidate from '../../components/InputValidate'
import { updateUser } from '../../redux'

import SidePanel from '../../components/SidePanel'

const EditUserInfo = ({ match, history }) => {
  const selectedUser = useSelector(state => state.admin.users[match.params.id])
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()

  const [isNameChanged, setIsNameChanged] = useState(false)
  const [isAvatarChanged, setIsAvatarChanged] = useState(false)
  const [isRoleChanged, setIsRoleChanged] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: ''
  })

  const roleArray = ['admin', 'staff', 'customer']

  // Load selected user 
  useEffect(() => {
    const { name, email, role } = selectedUser
    setFormData({ ...formData, name, email, role })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser])  

  const onSubmit = (data) => {
    let payload = {
      name: data.name, 
      avatar: (data.avatar.length ? data.avatar[0].name : ''),
      role: data.role
    } 
    
    let sendData = new FormData()
    sendData.append('id', selectedUser.id)
    sendData.append('name', payload.name)
    sendData.append('password', '')
    sendData.append('avatar', payload.avatar)
    sendData.append('role', payload.role)
    sendData.append('profileImage', data.avatar[0])
    
    dispatch(updateUser(sendData, getLoginInfo().token))
    .then(res => {
      history.push('/admin')
      toast.success('Profile Updated Successfully')
    })
    .catch(error => toast.error(error.response.data.error))

    // const { token } = getLoginInfo()
    
    // axios.put(`${process.env.REACT_APP_API_URL}/admin/update`, sendData, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    // .then(res => {
    //   // dispatch(updateUserData(res.data))
    //   history.push('/admin')
    //   toast.success('Profile Updated Successfully')
    // })
    // .catch(err => {      
    //   toast.error(err.response.data.error)
    // })

  }

  return (
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
                placeholder={selectedUser.email}
              />
              <div className="flex items-center justify-between mt-5">                
                <label className="w-32 flex flex-col items-center rounded-lg tracking-wide  cursor-pointer has-tooltip">                  
                  <img className=" w-12 h-12 rounded-full transform hover:scale-110" src={`${process.env.REACT_APP_API_URL}/uploads/${selectedUser.avatar}`} alt="Profile"/>
                  <span className="tooltip text-center  w-24 text-xs mt-14 bg-gray-600 text-gray-100 px-1 absolute rounded bg-opacity-50 ">Update user's profile image</span>
                
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
                    setIsNameChanged(e.target.value !== selectedUser.name)
                    setFormData({ ...formData, name: e.target.value })
                  }}
                  value={formData.name}
                  ref={register({ required: true, minLength: 3 })}
                />
                {errors.name && 
                <InputValidate filedName='name' type={errors.name.type} />}
              </div>
              
              <div className='flex items-center justify-center'>
                { roleArray.map((v, index) => (
                  <div className='flex justify-center items-center space-x-2 p-2 mt-5' key={index} >
                    <input 
                      className='transition-all duration-300 ease-in-out transform tracking-wide hover:scale-150 cursor-pointer' 
                      type="radio" 
                      value={v}                      
                      checked={formData.role === v}
                      onChange={e => {
                        setIsRoleChanged(e.target.value !== selectedUser.role)
                        setFormData({ ...formData, role: e.target.value })
                      }}
                      name='role'
                      ref={register}
                    />
                    <span className={`${(formData.role === v) && 'text-indigo-500'} uppercase text-gray-500`}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between space-x-2">
                <button
                  type='submit'
                  disabled={!isNameChanged && !isAvatarChanged && !isRoleChanged}
                  className='btn btn-submit mt-5'
                >
                  <i className={`fas fa-user-plus fa 1x w-6 ${(!isNameChanged  && !isAvatarChanged && !isRoleChanged) && 'text-gray-400'} -ml-2`} />
                  <span className={`ml-3 ${(!isNameChanged  && !isAvatarChanged && !isRoleChanged) && 'text-gray-400'}`}>Update</span>
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
