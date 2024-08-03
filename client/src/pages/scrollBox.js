// src/components/ScrollBox.js
import React, { useState } from 'react';

const ScrollBox = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  return (
    <div className="relative w-full max-w-4xl h-80 mx-auto overflow-hidden bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600">
      <div className="overflow-y-scroll h-full pr-2">
        <ul>
          <li className="border-b border-gray-100 dark:border-gray-600">
            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
              <img className="me-3 rounded-full w-16 h-16" src="/docs/images/people/profile-picture-1.jpg" alt="Jese Leos Avatar" />
              <div>
                <p className="text-base text-gray-500 dark:text-gray-400">
                  New message from <span className="font-medium text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"
                </p>
                <span className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</span>
              </div>
            </a>
          </li>
          {/* Other list items */}
          <li className="border-b border-gray-100 dark:border-gray-600">
            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
              <img className="me-3 rounded-full w-16 h-16" src="/docs/images/people/profile-picture-2.jpg" alt="Joseph McFall Avatar" />
              <div>
                <p className="text-base text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Joseph McFall</span> and <span className="font-medium text-gray-900 dark:text-white">5 others</span> started following you.
                </p>
                <span className="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</span>
              </div>
            </a>
          </li>
          {/* Add other list items here */}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex items-center justify-center h-16 relative">
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={toggleDropdown}
              className="inline-flex items-center px-5 py-2 font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <svg
                className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 19"
              >
                <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
                <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
              </svg>
              <span className="text-base text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Following</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600">
                <ul className="py-1">
                  <li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Option 1</li>
                  <li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Option 2</li>
                  <li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Option 3</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollBox;
