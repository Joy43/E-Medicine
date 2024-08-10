import React from 'react';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-4 animate-spin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        >
          <path d="M12 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10z"></path>
          <path d="M15 9l-6 6"></path>
          <path d="M9 9l6 6"></path>
        </svg>
      </div>
      <div className="text-xl text-blue-900">Loading...</div>
    </div>
  );
}

export default Loading;
