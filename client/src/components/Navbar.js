import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assests/flower.png'

const Navbar = () => {
  return (
    <nav className="bg-gray-200 h-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">

          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <Link to="/" className="flex items-center py-5 px-2 text-gray-500 hover:text-gray-700">                
                <img className="h-6 w-6 mr-1" src={logo} alt="FlowerLogo" />                
                <span className="font-bold">LilacTV</span>
              </Link>
            </div>

            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1">              
              <Link to="/about" className="py-5 px-3 text-gray-700 hover:bg-gray-500 hover:text-gray-100">About</Link>
              <Link to="/contact" className="py-5 px-3 text-gray-700 hover:bg-gray-500 hover:text-gray-100">Contact</Link>
            </div>
          </div>

          {/* secondary nav */}
          
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login" className="rounded-full py-2 px-3 uppercase text-xs font-bold tracking-wider cursor-pointer text-primary border-primary md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500">Sign in</Link>
            <Link to="/register" className="rounded-full py-2 px-3 uppercase text-xs font-bold tracking-wider cursor-pointer text-primary ml-2 border-primary md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500">Sign up</Link>
          </div>

          {/* mobile button goes here */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* mobile menu */}
      <div className="mobile-menu hidden md:hidden">
        <Link href="/about" className="block py-2 px-4 text-sm hover:bg-gray-200">About</Link>
        <Link href="/contact" className="block py-2 px-4 text-sm hover:bg-gray-200">Contact</Link>
      </div>
    </nav>
  )
}

export default Navbar
