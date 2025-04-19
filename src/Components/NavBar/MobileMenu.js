"use client";
import React, { useState, useEffect, useRef } from "react";

// A React component that receives a prop called setOpacity to control the opacity
const MobileMenu = ({ setOpacity }) => {
  const [isOpen, setIsOpen] = useState(false); // Stores if the menu is open or not
  const menuRef = useRef(null); // Reference to the menu element
  
  // Handle clicking on navigation items
  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  // Toggle menu open/closed
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Open/close
    setOpacity(!isOpen); // Opacity change based on setIsOpen
  };

  // Close the menu
  const closeMenu = () => {
    setIsOpen(false); // Close the menu
    setOpacity(false); // Reset opacity when the menu is closed
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
      {/* Hamburger Button */}
      <div className="block lg:hidden sm:p-0.5">
        <button
          onClick={toggleMenu}
          id="hamburger"
          className="text-[#FF50A3]"
        >
          {/* Toggle Hamburger Icon */}
          {isOpen ? (
            <i id="close-icon" className="fas fa-times text-3xl"></i> // Open close icon appears
          ) : (
            <i className="fa-sharp fa-solid fa-bars-staggered text-3xl"></i> // Close the bar icon shows
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef} // Add ref to the menu element
        className={`lg:hidden fixed inset-y-0 right-0 w-1/2 bg-[#23195F] bg-opacity-100 p-3 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-4 px-5">
          <button
            id="close-menu"
            onClick={closeMenu}
            className="text-[#FF50A3]"
          >
            <i id="close-icon" className="fas fa-times text-5xl"></i>
          </button>
        </div>
        
        <nav className="bg-[#23195F] flex justify-center items-center h-max text-[#FF50A3] text-lg pt-10">
          <ul className="block justify-center items-center space-y-[49px] pt-9  ">
            <li>
              <a href="#about" onClick={() => handleClick("about")} className="hover:text-[#FF50A3]">
                <div className="flex justify-center"></div>
                <span className="text-white font-semibold hover:text-[#FF50A3]  flex justify-center">Home</span>
              </a>
            </li>
            <li>
              <a href="#experience" onClick={() => handleClick("experience")} className="hover:text-[#FF50A3]">
                <div className="flex justify-center"> </div>
                <span className="text-white font-semibold hover:text-[#FF50A3] flex justify-center">About us</span>
              </a>
            </li>
            <li>
              <a href="#skills" onClick={() => handleClick("skills")} className="hover:text-[#FF50A3]">
                <div className="flex justify-center"> </div>
                <span className="text-white font-semibold hover:text-[#FF50A3] flex justify-center">Events</span>
              </a>
            </li>
            <li>
              <a href="#projects" onClick={() => handleClick("projects")} className="hover:text-[#FF50A3]">
                <div className="flex justify-center"></div>
                <span className="text-white font-semibold hover:text-[#FF50A3] flex justify-center">Contact</span>
              </a>
            </li>
          
            <li>
              <a href="#contact" onClick={() => handleClick("contact")} className="bg-transparent font-semibold  text-white border-2 border-[#FF50A3] justify-center rounded-full px-6 py-2 hover:bg-[#FF50A3] hover:text-[#0a192f] hover:font-bold transition-colors duration-300">
                Register
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
