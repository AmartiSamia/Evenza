"use client";
import React, { useState, useEffect, useRef } from "react";

const MobileMenu = ({ 
  isOpen, 
  setOpen, 
  onRegisterClick, 
  onLoginClick,
  onNavLinkClick 
}) => {
  const menuRef = useRef(null); // Reference to the menu element
  
  // Close the menu
  const closeMenu = () => {
    setOpen(false);
  };

  // Handle register click
  const handleRegisterClick = () => {
    onRegisterClick();
    closeMenu();
  };

  // Handle login click
  const handleLoginClick = () => {
    onLoginClick();
    closeMenu();
  };

  // Handle navigation link click
  const handleNavLinkClick = (id) => {
    onNavLinkClick(id);
    closeMenu();
  };

  // Effect to handle clicks outside the menu
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if menu is open and click was outside menu and not on hamburger button
      if (
        isOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        !event.target.closest('#hamburger')
      ) {
        closeMenu();
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleOutsideClick);
    
    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]); // Re-run effect when isOpen changes

  return (
    <>
      {/* Hamburger Button - This should be moved to the header component */}
      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`lg:hidden fixed inset-y-0 right-0 w-3/4 sm:w-1/2 bg-[#23195F] bg-opacity-100 p-3 transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-4 px-5">
          <button
            id="close-menu"
            onClick={closeMenu}
            className="text-[#FF50A3]"
          >
            <i id="close-icon" className="fas fa-times text-3xl"></i>
          </button>
        </div>
        
        <nav className="bg-[#23195F] flex justify-center items-center h-max text-[#FF50A3] text-lg pt-10">
          <ul className="block justify-center items-center space-y-8 pt-9 w-full px-4">
            <li>
              <button 
                onClick={() => handleNavLinkClick("home")}
                className="hover:text-[#FF50A3] w-full text-center"
              >
                <span className="text-white font-semibold hover:text-[#FF50A3]">Home</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavLinkClick("about")}
                className="hover:text-[#FF50A3] w-full text-center"
              >
                <span className="text-white font-semibold hover:text-[#FF50A3]">About us</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavLinkClick("events")}
                className="hover:text-[#FF50A3] w-full text-center"
              >
                <span className="text-white font-semibold hover:text-[#FF50A3]">Events</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavLinkClick("contact")}
                className="hover:text-[#FF50A3] w-full text-center"
              >
                <span className="text-white font-semibold hover:text-[#FF50A3]">Contact</span>
              </button>
            </li>
            <li className="pt-4">
              <button 
                onClick={handleLoginClick}
                className="bg-transparent font-semibold text-white border-2 border-[#FF50A3] rounded-full px-6 py-2 hover:bg-[#FF50A3] hover:text-[#0a192f] hover:font-bold transition-colors duration-300 w-full"
              >
                Login
              </button>
            </li>
            <li>
              <button 
                onClick={handleRegisterClick}
                className="bg-transparent font-semibold text-white border-2 border-[#FF50A3] rounded-full px-6 py-2 hover:bg-[#FF50A3] hover:text-[#0a192f] hover:font-bold transition-colors duration-300 w-full"
              >
                Register
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;