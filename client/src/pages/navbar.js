import React, { useState, useEffect } from 'react';
import { Link, useNavigate ,useLocation} from 'react-router-dom';
import axios from 'axios';
import { TypewriterEffect } from './typewriter';

const Navbar = () => {
  var userName = sessionStorage.getItem("username");
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    mail: "",
  });
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    if (!userName) {
      if(location.pathname!='/' && location.pathname!='/home' && location.pathname!='/form')
      if(location.pathname!='/' && location.pathname!='/home' && location.pathname!='/form')
        navigate('/entry');
      return;
    }

    const fetchData = async () => {
      try {
        console.log(`Fetching data for userName: ${userName}`); // Log userName
        const response = await axios.get('http://localhost:12000/wallet-card', {
          params: { userName } // Use axios params for query strings
        });
        console.log('Response data:', response.data); // Log API response data

        setData({
          mail: response.data.email || "",
          userName,
        });

      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchData();
  }, [userName, navigate]);

  const SignOut = () => {
    sessionStorage.removeItem("username");
    toggleDropdown();
    data.mail="";
    data.userName="";
  };
  const SignIn = () => {
    toggleDropdown();
  };

  return (
    <nav className=" border-gray-200 bg-zinc-950" style={{ zIndex: 50 }}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/sample_logo.png" className="h-8" alt="Sample Logo" />
          <TypewriterEffect
            text="Smart Money"
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            cursorClassName="bg-black dark:bg-white w-1 ml-1"
            typingSpeed={150}
          />
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          <button
            type="button"
            className="flex text-sm bg-[#244855] rounded-full md:me-0"
            id="user-menu-button"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="user photo" />
          </button>
          {/* Dropdown menu */}
          <div
            className={`absolute right-0 mt-2 w-48 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-black dark:divide-gray-600 ${isDropdownOpen ? 'block' : 'hidden'}`}
            style={{ top: '100%' }}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">{data.userName}</span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{data.mail}</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link to="/dashboard" onClick={SignIn} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link to="/wallet" onClick={SignIn}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Wallet</Link>
              </li>
              <li>
                <Link to="/userinfo" onClick={SignIn}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit Account</Link>
              </li>
              <li>
                {userName ? (
                  <Link to="/entry" onClick={SignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                ) : (
                  <Link to="/entry" onClick={SignIn}   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign in</Link>
                )}
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-menu">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black dark:border-gray-700">
            <li>
              <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
            </li>
            <li>
              <Link to="/dashboard" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Dashboard</Link>
            </li>
            <li>
              <Link to="/chatBot" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Chat Bot</Link>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Investments</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;