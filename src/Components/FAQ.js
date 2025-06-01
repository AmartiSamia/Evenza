import React from 'react';

const FAQ = () => {
  const questions = [
    "How do I register for an event?",
    "Can I cancel or modify my registration?",
    "Is there a fee to use the platform?"
  ];

  return (
    <div className="flex justify-center max-sm:mx-[15px] lg:mx-[240px] bg-white py-8 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 sm:mx-[10px] sm:gap-10 md:grid-cols-2 gap-8">
        
        {/* Left Side */}
        <div className="w-full">
          <h2 className="text-black text-lg font-semibold mb-3">Ready to Get Started?</h2>
          <p className="text-sm text-gray-900 mb-6 max-w-xs">
            Join Evenza today and start planning your next successful event with ease.
          </p>

          <form className="flex items-center max-w-xs mb-6 shadow-md rounded-full bg-white overflow-hidden">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="flex-grow px-3 sm:px-5 py-2 text-sm text-gray-900 focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-400 to-pink-500 px-3 sm:px-4 py-2 text-white text-sm rounded-full shadow-md"
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <div className="flex space-x-4 text-gray-900 text-sm font-semibold">
            <a href="#" className="hover:text-pink-500"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-pink-500"><i className="fab fa-x-twitter"></i></a>
            <a href="#" className="hover:text-pink-500"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:mt-0">
          <h2 className="text-black text-lg font-semibold mb-3">Frequently Asked Questions</h2>
          <ul className="text-sm text-gray-900 space-y-4 pt-2 w-full">
            {questions.map((q, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-gray-200 pb-2 cursor-pointer hover:text-pink-500 transition-colors"
              >
                <span className="pr-2">{q}</span>
                <i className="fas fa-arrow-right text-sm flex-shrink-0"></i>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
