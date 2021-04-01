import React from 'react'
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div className="text-gray-500 bg-gray-200 text-sm h-32 sm:h-12">
      <div className='max-w-6xl mx-auto px-4 pt-4'>
        <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0'>
          <div className='uppercase space-x-4 sm:w-1/3 sm:text-left'>
            <Link to='/contact' exact className='hover:text-indigo-500'>
              <span>Report issue</span>          
            </Link>
            <Link to='/contact' exact className='hover:text-indigo-500'>
              <span>Feature request</span>
            </Link>          
          </div>
          <div className='space-x-4 sm:w-1/3 sm:text-center'>
            <a href='https://www.facebook.com/profile.php?id=100008025733817' target='_blank' className='hover:text-indigo-500' rel='noopener noreferrer'>
              <i className='fab fa-facebook-square  w-4'></i>        
            </a>
            <a href='https://github.com/badjin' target='_blank' className='hover:text-indigo-500' rel='noopener noreferrer'>
              <i className='fab fa-github-square  w-4'></i>
            </a>
            <a href='https://www.linkedin.com/in/jin-kim-469b07a1/' target='_blank' className='hover:text-indigo-500' rel='noopener noreferrer'>
              <i className='fab fa-linkedin  w-4'></i>
            </a>
          </div>
          <div className='sm:w-1/3 sm:text-right'>
            <span>&copy; Lilac 2021</span>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Footer
