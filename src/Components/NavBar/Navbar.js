'use client';
import React from 'react';

const NavBar = ({ onRegisterClick, onNavLinkClick }) => {
  return (
    <div id="NavBar_principal" className="hidden lg:block font-montreal">
      <nav className="flex items-center space-x-10 text-[#FF50A3] text-sm">
        <button 
          onClick={() => onNavLinkClick("home")}
          className="hover:text-[#FF50A3]"
        >
          <span className="text-white font-semibold hover:text-[#FF50A3]">Home</span>
        </button>
        <button 
          onClick={() => onNavLinkClick("about")}
          className="hover:text-[#FF50A3]"
        >
          <span className="text-white font-semibold hover:text-[#FF50A3]">About us</span>
        </button>
        <button 
          onClick={() => onNavLinkClick("events")}
          className="hover:text-[#FF50A3]"
        >
          <span className="text-white font-semibold hover:text-[#FF50A3]">Events</span>
        </button>
        <button 
          onClick={() => onNavLinkClick("contact")}
          className="hover:text-[#FF50A3]"
        >
          <span className="text-white font-semibold hover:text-[#FF50A3]">Contact</span>
        </button>
        <button 
          onClick={onRegisterClick}
          className="bg-transparent font-semibold text-white border-2 border-[#FF50A3] rounded-full px-6 py-2 hover:bg-[#FF50A3] hover:text-[#0a192f] hover:font-bold transition-colors duration-300"
        >
          Register
        </button>
      </nav>
    </div>
  );
};

export default NavBar;