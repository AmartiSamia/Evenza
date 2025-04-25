import React from 'react';

const FAQ = () => {
    return (
        <div className="bg-[#FFFFFF] py-[95px] mx-[320px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div >
          <h2 className="text-black text-lg font-semibold mb-3">Ready to Get Started</h2>
          <p className="text-sm text-[#1a1a1a] mb-6 max-w-xs">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          <form className="flex items-center max-w-xs mb-6 shadow-md rounded-full bg-white overflow-hidden">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="flex-grow px-5 py-2 text-sm text-[#1a1a1a] focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-400 to-pink-500 px-4 py-2 text-white text-sm rounded-full shadow-md"
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <div className="flex space-x-4 text-[#1a1a1a] text-sm font-semibold">
            <a href="#" className="hover:text-pink-500"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-pink-500"><i className="fab fa-x-twitter"></i></a>
            <a href="#" className="hover:text-pink-500"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        {/* Right Side */}
        <div className='ml-[20px]'>
          <h2 className="text-black text-lg font-semibold mb-3 ">Frequently Asked Question</h2>
          <ul className="text-sm text-[#1a1a1a] space-y-4 pt-2 max-w-sm">
            {Array(3).fill().map((_, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-[#d6d3e0] pb-2 cursor-pointer"
              >
                <span>Lorem Ipsum is simply dummy text of the</span>
                <i className="fas fa-arrow-right text-sm text-[#1a1a1a]"></i>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>)
};

export default FAQ;