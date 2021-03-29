import React , { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

export const AccountDropdown = ({user, onLogout}) => {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Esc' || e.key === 'Escape') setIsOpen(false)
    })
  }, [])

  return (
    <div className='relative '>
      <div className='flex items-center space-x-3'>
        <span className='text-purple-500 text-sm'>{user.name}</span>
        <button           
          className='relative z-10 h-8 w-8 rounded-full overflow-hidden boder-2 border-gray-600 focus:outline-none focus:border-white transform hover:scale-125 transition duration-300 ease-in-out' 
          onClick={() => {setIsOpen(!isOpen)}}>
          <img className='h-full w-full object-cover' src={`${process.env.REACT_APP_PROFILE_URL}/${user.avatar}`} alt="Profile"/>        
        </button>
        
      </div>
      { isOpen && (
        <>
          <button
          className='fixed inset-0 h-full w-full bg-black opacity-50 cursor-default' 
          tabIndex='-1'
          onClick={() => {setIsOpen(false)}}></button>
          
          <div className='absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl'>
            <Link
              to='/profile'
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              onClick={() => {setIsOpen(false)}}
            >
              Profile
            </Link>
            {/* <Link
              to='/admin'
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              onClick={() => {setIsOpen(false)}}
            >
              User Management
            </Link> */}
            <Link
              to='/'
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              onClick={() => {
                setIsOpen(false)
                onLogout()
              }}
            >
              Sign out
            </Link>
          </div>
        </>
      )}      
    </div>
  )
}
