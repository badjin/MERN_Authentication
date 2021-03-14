import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assests/flower.png";
import { signout, isAuth } from "../helpers/auth";
import { toast } from "react-toastify";

const Navbar = ({ history }) => {
  // const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   setIsLogin(isAuth() ? true : false);
  // }, [isAuth()]);

  return (
    <nav className="h-16" style={{ background: 'linear-gradient(to left, #F0F4FD, #A1A3BA)' }}>
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
            {isAuth() ? (
              <button
                onClick={() => {
                  signout(() => {
                    setTimeout(() => {
                      toast.success("Signed out Successfully");
                    }, 500);
                    history.push("/");
                  });
                }}
                className="btn-round text-primary border-primary hover:bg-primary hover:text-white"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-round text-primary border-primary hover:bg-primary hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="btn-round text-primary border-primary hover:bg-primary hover:text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* mobile button goes here */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
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
      <div className="mobile-menu hidden md:hidden">
        <Link
          to="/about"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
