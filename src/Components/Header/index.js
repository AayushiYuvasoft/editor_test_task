'use client'
// components/Header.js

import Image from 'next/image';
import React, { useState } from 'react';
import Logo from '../../assets/image/QuillShield-Logo.svg'
import userProfile from '../../assets/icons/userProfileIcon.svg'
import downIcon from '../../assets/icons/downIcon.svg'

import './style.css'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-secondary rounded">
      <nav className="flex justify-between items-center">
        <div className="text-white font-bold text-xl px-9 py-3 logo-wrapper">
            <Image src={Logo} width={128} height={28} alt=""/>
        </div>
        <ul className="flex space-x-4 menu-list">
          <li>
            <a href="#" className="text-white hover:text-gray-300 active font-bold">AI Audit</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300 font-bold">Manual Audit</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300 font-bold">RedTeam</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300 font-bold">Monitor</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300 font-bold">Incident Response</a>
          </li>
        </ul>

       <div className="relative h-[52] overflow-visible">
          <button onClick={toggleDropdown} className="text-white hover:text-gray-300 focus:outline-none flex items-center justify-between proile-btn">
           <div className='flex items-center'>
            <Image src={userProfile} width={28} height={28} alt="" />
            <span className='inline-block ml-3'>Johhny Doe</span>
            </div> 
            <Image src={downIcon} width={14} height={7} alt="" />
          </button>
          {isOpen && (
            <ul className="absolute bg-gray-800 text-white py-2 px-4 mt-2 rounded-lg">
              <li><a href="#" className="block hover:text-gray-300">Profile</a></li>
              <li><a href="#" className="block hover:text-gray-300">Settings</a></li>
              <li><a href="#" className="block hover:text-gray-300">Logout</a></li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
