import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  
  // State to manage the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h3 className="text-white text-2xl font-bold hover:text-blue-300">
              Status Viewer
            </h3>
          </div>

          {/* Desktop Links */}
          {!isLoggedIn ? (
            <>
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/"
                  className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:flex space-x-8">
                <Link to="/dashboard" className="text-white text-lg pt-2 font-medium hover:text-blue-300">
                  Welcome {user?.name || 'User'}
                </Link>

                {(user?.role === 'admin' || user?.role === 'incident_adder') && (
                  <Link to="/incidents" className="text-white text-lg pt-2 font-medium hover:text-blue-300">
                    Incidents
                  </Link>
                )}

                {user?.role === 'admin' && (
                  <Link to="/services" className="text-white text-lg pt-2 font-medium hover:text-blue-300">
                    Services
                  </Link>
                )}

                <Link to="/dashboard" className="text-white text-lg pt-2 font-medium hover:text-blue-300">
                  Dashboard
                </Link>

                <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">
                  Logout
                </button>
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Links */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 py-4">
            {!isLoggedIn ? (
              <>
                <Link to="/" className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-white text-lg pt-2 font-medium hover:text-blue-300">
                  Welcome {user?.name || 'User'}
                </Link>

                {(user?.role === 'admin' || user?.role === 'incident_adder') && (
                  <Link to="/incidents" className="text-white text-lg pt-2 font-medium hover:text-blue-300">
                    Incidents
                  </Link>
                )}

                {user?.role === 'admin' && (
                  <Link to="/services" className="text-white text-lg pt-2 font-medium hover:text-blue-300">
                    Services
                  </Link>
                )}

                <Link to="/dashboard" className="text-white text-lg pt-2 font-medium hover:text-blue-300">
                  Dashboard
                </Link>

                <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
