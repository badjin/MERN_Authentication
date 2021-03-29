import React , { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const AdminMenu = ({user, onLogout}) => {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Esc' || e.key === 'Escape') setIsOpen(false)
    })
  }, [])

  return (
    <div className='relative '>
      <div className='flex items-center space-x-3'>
        <button           
          className='relative z-10 py-5 px-3 font-bold text-gray-700 hover:bg-gray-500 hover:text-yellow-200 focus:outline-none uppercase'          
          onClick={() => {setIsOpen(!isOpen)}}>
          Admin 
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
              to='/admin/users'
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              onClick={() => {setIsOpen(false)}}
            >
              User Management
            </Link>
            <Link
              to='/admin/settings'
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              onClick={() => {setIsOpen(false)}}
            >
              Settings
            </Link>
          </div>
        </>
      )}      
    </div>
  )
}

export default AdminMenu