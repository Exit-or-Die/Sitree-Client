import Image from 'next/image';
import React from 'react';

import SButton from '../common/Button';
import SInput from '../common/Input';

export const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200 shadow-sm max-h-[56px]">
      {/* Logo and Navigation */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/icon.svg" width={30} height={30} alt="Sitree Logo" />
          <span className="text-xlarge font-sb text-slate-30">Sitree</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <a href="/rankings" className="text-gray-600 hover:text-gray-900">
            소속 랭킹
          </a>
          <a href="/user-rankings" className="text-gray-600 hover:text-gray-900">
            유저 랭킹
          </a>
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <SInput
          type="text"
          placeholder="사용자 검색"
          className="h-10 w-48 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* New Product Button */}
        <SButton className="flex items-center px-4 py-2 text-sm font-medium text-green-600 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          새 프로덕트
        </SButton>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.125a9 9 0 0115 0"
              />
            </svg>
          </div>
          <span className="text-gray-800 text-sm font-medium">이혜린</span>
        </div>
      </div>
    </header>
  );
};
