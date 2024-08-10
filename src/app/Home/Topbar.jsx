import React from 'react';

export default function Topbar() {
  return (
    <div className="bg-gray-800 py-2 m-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-col sm:flex-row justify-center sm:justify-around items-center text-white text-lg sm:text-sm gap-2 sm:gap-4 lg:gap-8">
          <li className="hover:text-gray-400 cursor-pointer transition-colors duration-200">
            Quick Help
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition-colors duration-200">
            Call us: (+800) 1234 5678 90
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition-colors duration-200">
            info@company.com
          </li>
        </ul>
      </div>
    </div>
  );
}
