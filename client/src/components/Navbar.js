import React, { useState, useEffect } from "react"
import { NavLink, Link, useHistory } from "react-router-dom"
import logo from "../assests/logo.png"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../redux'

const Navbar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [isMobile, setIsMobile] = useState(false)

  const history = useHistory()
  const logout = () => {
    dispatch(logoutUser())
    .then(() => {
      setIsMobile(false)
      toast.success('Signed out Successfully')
      history.push('/')
    })
  }

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile)
  }

  const closeMobileMenu = () => {
    setIsMobile(false)
  }

  useEffect(() => {
    window.addEventListener('resize', (() => {
      if(window.innerWidth >= 768) setIsMobile(false)
    }))
  }, [])

  return (
    <nav className="md:h-16" style={{ background: 'linear-gradient(to left, #F0F4FD, #A1A3BA)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <NavLink
                to="/" exact
                className="flex items-center py-5 px-2 text-purple-500 hover:text-gray-100 transform hover:scale-125"
                activeClassName="active-navbar"
              >
                <img className="h-6 w-6 mr-1" src={logo} alt="FlowerLogo" />
                <span className="font-bold">LilacTV</span>
              </NavLink>
            </div>

            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink
                to="/about"
                className="py-5 px-3 text-gray-700 hover:bg-gray-500 hover:text-gray-100"
                activeClassName="active-navbar"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="py-5 px-3 text-gray-700 hover:bg-gray-500 hover:text-gray-100"
                activeClassName="active-navbar"
              >
                Contacts
              </NavLink>
            </div>
          </div>

          {/* secondary nav */}

          <div className="hidden md:flex items-center space-x-2">
            {user.isLogin 
            ? (
              <>
                <div className='flex items-center mr-1 cursor-pointer'>
                  <img className="w-8 h-8 rounded-full" src={`${process.env.REACT_APP_API_URL}/uploads/${user.userData.avatar}`} alt="Profile"/>
                  <Link
                    to='/profile'
                    className="ml-2 px-3 py-2 text-purple-500 text-sm hover:text-white hover:bg-purple-500 rounded-full transition ease-out duration-500"
                  >
                    {user.userData.name}                    
                  </Link>
                </div>
                <Link
                  to='/'
                  onClick={logout}
                  className="my-2 btn-round text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"
                >
                  Sign out
                </Link>
              </>
            ) 
            : (
              <>
                <Link
                  to="/login"
                  className="my-2 btn-round text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="my-2 btn-round text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* mobile button goes here */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button" onClick={toggleMobileMenu}>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {isMobile && (
        <div className="mobile-menu md:hidden flex flex-col items-center justify-start">
          <NavLink
            to="/about"
            className="py-2 px-3 text-gray-700 hover:bg-gray-500 hover:text-gray-100 rounded-full"
            activeClassName="active-navbar" onClick={closeMobileMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="py-2 px-3 text-gray-700 hover:bg-gray-500 hover:text-gray-100 rounded-full"
            activeClassName="active-navbar" onClick={closeMobileMenu}
          >
            Contacts
          </NavLink>

          <div className="flex space-x-2 mb-3 items-center">
            {user.isLogin 
            ? (
              <>
                <div className='flex items-center mr-1'>
                <img className="w-8 h-8 rounded-full" src={`${process.env.REACT_APP_API_URL}/uploads/${user.userData.avatar}`} alt="Profile"/>
                  <Link
                    to='/profile'
                    className="ml-2 px-3 py-2 text-purple-500 text-sm hover:text-white hover:bg-purple-500 rounded-full transition ease-out duration-500"
                  >
                    {user.userData.name}
                  </Link>
                </div>
                <Link
                  to='/'
                  onClick={logout}
                  className="my-2 btn-round text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"                  
                >
                  Sign out
                </Link>
              </>
            ) 
            : (
              <>
                <Link
                  to="/login"
                  className="my-2 btn-round text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"
                  onClick={closeMobileMenu}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="my-2 btn-round text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"
                  onClick={closeMobileMenu}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      
    </nav>
  )
}


export default Navbar
