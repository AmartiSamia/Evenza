'use client';
import React from 'react';

const NavBar = () => {
  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
  // <div className='row flex'>
    <div id="NavBar_principal" className="hidden lg:block font-montreal  ">
      <nav className="flex items-center space-x-10 text-[#FF50A3] text-sm">
        <a href="#about" onClick={() => handleClick("about")} className="hover:text-[#FF50A3]">
          <span className="text-white font-semibold  hover:text-[#FF50A3]">Home</span>
        </a>
        <a href="#experience" onClick={() => handleClick("experience")} className="hover:text-[#FF50A3]">
          <span className="text-white font-semibold  hover:text-[#FF50A3]">About us</span>
        </a>
        <a href="#skills" onClick={() => handleClick("skills")} className="hover:text-[#FF50A3]">
          <span className="text-white font-semibold  hover:text-[#FF50A3]">Events</span>
        </a>
        <a href="#projects" onClick={() => handleClick("projects")} className="hover:text-[#FF50A3]">
          <span className="text-white font-semibold   hover:text-[#FF50A3]">Contact</span>
        </a>
        <a href="#contact" onClick={() => handleClick("contact")} className="bg-transparent font-semibold  text-white border-2 border-[#FF50A3] rounded-full px-6 py-2 hover:bg-[#FF50A3] hover:text-[#0a192f] hover:font-bold transition-colors duration-300">
  Register
</a>
      </nav>
      
    </div>
        //  <hr className='border-b border-gray-300 w-full' />
        //  </div>
  );
};

export default NavBar;
