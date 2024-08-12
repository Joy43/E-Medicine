import { useRouter } from 'next/navigation';
import React from 'react';


export default function Topbar() {
  const router = useRouter();

  const handleQuickHelpClick = () => {
    router.push('/contact'); // Replace '/quick-help' with the actual path to the component you want to navigate to
  };

  return (
    <div className="bg-gray-800 py-2 m-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-col sm:flex-row justify-center sm:justify-around items-center text-white text-xl sm:text-sm gap-2 sm:gap-4 lg:gap-8">
          <li
            className="hover:text-gray-400 cursor-pointer transition-colors duration-200"
            onClick={handleQuickHelpClick}
          >
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
