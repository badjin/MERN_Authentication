import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { getLoginInfo } from '../../helpers/auth'
import InputValidate from '../../components/InputValidate'
import { getSettings, updateSettings, getBgImagesFromUnsplash } from '../../redux'


const SiteConfig = ({ history }) => {
  const settings = useSelector(state => state.admin.settings) 
  const bgImages = useSelector(state => state.bgImage.bgImages)
  const dispatch = useDispatch()
  const { register, handleSubmit, errors, reset } = useForm()

  const [isDbChanged, setIsDbChanged] = useState(false)
  const [isThemeChanged, setIsThemeChanged] = useState(false)
  const [formData, setFormData] = useState({
    db: '',
    theme: ''
  })
  const [bgImage, setBgImage] = useState(bgImages[Math.floor(Math.random() * 20)].urls.regular)

  const dbArray = ['MONGODB', 'FIREBASE']

  useEffect(() => {
    dispatch(getSettings())
    .then(res => {
      setFormData(res)
    })
    .catch(error => toast.error(error.response.data.error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (data) => {    
    dispatch(getBgImagesFromUnsplash(data.theme))
    .then((res) => {
      if(res.length) {
        setBgImage(res[Math.floor(Math.random() * 20)].urls.regular)
        dispatch(updateSettings(data, getLoginInfo().token))
        .then(res => {
          // console.log(bgImages)
          reset(data)
        })
        .catch(error => toast.error(error.response.data.error))
      }
    })
    .catch(error => {
      reset(data)
      toast.error(error)
    })    
  }

  return (
    <div className='bj-container'>
      <div className='sm:w-1/2 xl:w-5/12 p-3 sm:p-6'>
        <div className='my-4 flex flex-col items-center'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            Site settings
          </h1>

          <form
            className='w-full my-6 flex-1 text-indigo-500'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='mx-auto max-w-xs'>                   
              <label className='text-gray-500 text-left font-bold  px-1'>Select Database</label>
              <div className='flex items-center justify-between px-3 py-1 mb-5 border-2 border-gray-300 rounded-lg'>
                { dbArray.map((v, index) => (
                  <div className='flex items-center space-x-2 p-2' key={index} >
                    <input 
                      className='tracking-wide cursor-pointer'
                      type="radio" 
                      value={v}                      
                      checked={formData.db === v}
                      onChange={e => {
                        setIsDbChanged(e.target.value !== settings.db)
                        setFormData({ ...formData, db: e.target.value })
                      }}
                      name='db'
                      ref={register}
                    />
                    <span className={`${(formData.db === v) && 'text-indigo-500'} uppercase text-gray-500`}>{v}</span>
                  </div>
                ))}
              </div>
              <label className='text-gray-500 text-left font-bold px-1'>Set Theme</label>
              <input
                  name='theme'
                  className='input-field'
                  type='text'
                  placeholder={formData.theme}
                  onChange={e => {
                    setIsThemeChanged(e.target.value !== settings.theme)
                    setFormData({ ...formData, theme: e.target.value })
                  }}
                  value={formData.theme}
                  ref={register({ minLength: 2, pattern: /[A-Za-z]/ })}
                />
                {errors.theme && 
                <InputValidate filedName='theme' type={errors.theme.type} />}

              <div className="flex justify-between space-x-2 mt-6">
                <button
                  type='submit'
                  disabled={!isDbChanged && !isThemeChanged}
                  className='btn btn-submit'
                >
                  <i className={`fas fa-wrench fa 1x w-6 ${(!isDbChanged  && !isThemeChanged) && 'text-gray-400'} -ml-2`} />
                  <span className={`ml-3 ${(!isDbChanged  && !isThemeChanged) && 'text-gray-400'}`}>Apply</span>
                </button>
                <button
                  className='btn bg-pink-500 text-gray-100 hover:bg-pink-700'
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
        <div className='w-full rounded-r-xl bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }} >
          <div className="flex flex-col justify-end h-full rounded-r-xl absoluteinset-0 bg-indigo-900 bg-opacity-30">            
            <h1 className='p-12 text-left text-xl text-gray-100 tracking-wide'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia quam laboriosam dolorum et quasi accusamus? Eius aliquam soluta illum quasi laborum suscipit consectetur id reiciendis! Veniam alias necessitatibus accusantium distinctio.</h1>            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteConfig
