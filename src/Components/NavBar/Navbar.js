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
    <div id="NavBar_principal" className="hidden lg:block">
      <nav className="flex items-center space-x-8 text-[#FF50A3] text-sm">
        <a href="#about" onClick={() => handleClick("about")} className="hover:text-[#FF50A3]">
        <span className="text-[#CCD6F6] hover:text-[#FF50A3]">Home</span>
        </a>
        <a href="#experience" onClick={() => handleClick("experience")} className="hover:text-[#FF50A3]">
        <span className="text-[#CCD6F6] hover:text-[#FF50A3]">About us</span>
        </a>
        <a href="#skills" onClick={() => handleClick("skills")} className="hover:text-[#FF50A3]">
         <span className="text-[#CCD6F6] hover:text-[#FF50A3]">Events</span>
        </a>
        <a href="#projects" onClick={() => handleClick("projects")} className="hover:text-[#FF50A3]">
         <span className="text-[#CCD6F6] hover:text-[#FF50A3]">Contact</span>
        </a>
        {/* <a href="#certifications" onClick={() => handleClick("certifications")} className="hover:text-[#FF50A3]">
         <span className="text-[#CCD6F6] hover:text-[#FF50A3]">Certifications</span>
        </a> */}
        <a href="#contact" onClick={() => handleClick("contact")} className="border border-[#FF50A3] px-4 py-2 rounded hover:bg-[#FF50A3] hover:text-[#0a192f]">
          Register
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
