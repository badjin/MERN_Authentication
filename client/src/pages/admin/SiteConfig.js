import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { getLoginInfo } from '../../helpers/auth'
import InputValidate from '../../components/InputValidate'
import { updateUser } from '../../redux'

import SidePanel from '../../components/SidePanel'

const SiteConfig = ({ match, history }) => {
  const settings = useSelector(state => state.admin.settings)  
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()

  const [isDbChanged, setIsDbChanged] = useState(false)
  const [isThemeChanged, setIsThemeChanged] = useState(false)
  const [formData, setFormData] = useState({
    db: '',
    theme: ''
  })

  const dbArray = ['MongoDB', 'Firebase']

  // Load selected user 
  useEffect(() => {
    const { db, theme } = settings
    setFormData({ ...formData, db, theme })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])  

  const onSubmit = (data) => {
    console.log(data)

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
            <div className='mx-auto max-w-xs'>              
              <div className='flex items-center justify-center'>
                { dbArray.map((v, index) => (
                  <div className='flex justify-center items-center space-x-2 p-2 mt-5' key={index} >
                    <input 
                      className='tracking-wide cursor-pointer'
                      type="radio" 
                      value={v}                      
                      checked={formData.db === v}
                      onChange={e => {
                        setIsDbChanged(e.target.value !== settings.db)
                        setFormData({ ...formData, db: e.target.value })
                      }}
                      name='role'
                      ref={register}
                    />
                    <span className={`${(formData.db === v) && 'text-indigo-500'} uppercase text-gray-500`}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between space-x-2">
                <button
                  type='submit'
                  disabled={!isDbChanged && !isThemeChanged}
                  className='btn btn-submit mt-5'
                >
                  <i className={`fas fa-user-plus fa 1x w-6 ${(!isDbChanged  && !isThemeChanged) && 'text-gray-400'} -ml-2`} />
                  <span className={`ml-3 ${(!isDbChanged  && !isThemeChanged) && 'text-gray-400'}`}>Apply</span>
                </button>
                <button
                  className='btn mt-5 bg-pink-500 text-gray-100 hover:bg-pink-700'
                  onClick={() => {
                    history.push('/')
                  }}
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2' />
                  <span className='ml-3'>Go to Home</span>
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

export default SiteConfig
