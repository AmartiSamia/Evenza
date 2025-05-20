import React from 'react';
import Man from '../Assets/AccrocheSection/manSmiling.png';

const Accroche = ({ onGetTicketsClick }) => {
 const handleGetTicketsClick = (e) => {
  e.preventDefault();
  console.log('Get Tickets button clicked in Accroche component');
  
  if (onGetTicketsClick && typeof onGetTicketsClick === 'function') {
    onGetTicketsClick(); // Let parent component handle the logic
  } else {
    // Fallback scrolling logic (no state changes)
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  };

  return ( 
    <section className="bg-[#271A5F] relative w-full overflow-hidden flex flex-col max-sm:h-auto sm:h-[650px] lg:mt-[50px] sm:mt-[50px] max-sm:mt-[5px]">
      {/* Background decorative bubble elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bubbles with responsive sizes */}
        <div className="absolute top-[10%] left-[10%] w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-blue-600 opacity-20"></div>
        <div className="absolute top-[8%] right-[28%] w-10 sm:w-16 h-10 sm:h-16 rounded-full bg-blue-500 opacity-20"></div>
        <div className="absolute top-[15%] left-[28%] w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-purple-500 opacity-20"></div>
        <div className="absolute top-[42%] left-[5%] w-10 sm:w-16 h-10 sm:h-16 rounded-full bg-purple-700 opacity-20"></div>
        <div className="absolute top-[50%] left-[25%] w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-purple-500 opacity-15"></div>
        <div className="absolute bottom-[20%] left-[15%] w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-purple-800 opacity-15"></div>
        <div className="absolute top-[55%] left-[40%] w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-blue-500 opacity-20"></div>
        <div className="absolute top-[20%] left-[35%] w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-blue-400 opacity-15"></div>
        <div className="absolute bottom-[10%] left-[30%] w-6 sm:w-10 h-6 sm:h-10 rounded-full bg-purple-600 opacity-20"></div>
      </div>

      {/* Content container with flex direction column on mobile, row on larger screens */}
      <div className="flex max-sm:flex-col sm:flex-row w-full h-full mt-[40px]">
        {/* Left content */}
        <div className="max-sm:order-1 max-sm:w-full max-sm:px-4 max-sm:py-8 sm:w-1/2 lg:w-1/2 flex flex-col justify-center sm:pl-16 sm:pr-8 z-10 relative sm:mt-[-30px]">
          {/* Decorative dots - hidden on mobile */}
          <div className="absolute lg:top-5 lg:left-20 sm:top-9 max-sm:hidden sm:left-10">
            <div className="grid grid-cols-9 gap-2">
              {Array(81).fill().map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 sm:w-1 sm:h-1 bg-white rounded-full opacity-80"></div>
              ))}
            </div>
          </div>
          
          {/* Text content container with proper mobile centering */}
          <div className='max-sm:w-full max-sm:text-center sm:ml-[30px] sm:w-[400px] lg:ml-[180px] lg:w-[960px] lg:mt-[-50px] sm:mt-[-20px]'>
            <p className="text-pink-500 max-sm:text-2xl sm:text-2xl lg:text-4xl uppercase tracking-wider font-medium mb-2">
              WELCOME TO
            </p>

            {/* Project Name */}
            <h2 className="text-white max-sm:text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-wide mb-6">
              Evenza
              <svg
                className="absolute max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:w-[180px]" 
                viewBox="1 8 300 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop
                      offset="0%"
                      style={{ stopColor: "#023bf8", stopOpacity: 1 }}
                    />
                    <stop
                      offset="45%"
                      style={{ stopColor: "#fb09e7", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#23195A", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M2,15 Q100,1 250,20"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </h2>

            {/* Slogan */}
            <p className="text-white max-sm:text-xl sm:text-2xl lg:text-3xl font-light italic mb-6 max-w-xl leading-snug">
              Plan Today, Enjoy Tomorrow—<br className='hidden sm:block' />
              Register with <span className="text-pink-400 font-semibold">Evenza</span> for Seamless Events!
            </p>

            {/* Fixed button container and button with improved event handling */}
            <div className="max-sm:justify-center p-[2px] rounded-full bg-gradient-to-r from-pink-500 to-purple-600 inline-block">
              <button 
                type="button"
                onClick={handleGetTicketsClick}
                className="bg-[#271A5F] text-white rounded-full py-3 max-sm:text-[14px] max-sm:px-6 sm:px-6 lg:px-10 hover:bg-white hover:text-[#271A5F] transition-colors sm:w-max lg:w-max cursor-pointer"
              >
                Get Tickets
              </button>
            </div>
          </div>
        </div>

        {/* Right content - image */}
        <div className="max-sm:order-2 max-sm:w-full lg:ml-[90px] max-sm:h-[250px] sm:w-[500px] lg:w-1/2 relative bg-gradient-to-r from-pink-500 to-purple-600 rounded-tl-[80px]">
          <div className="h-full w-full relative">
            <img 
              src={Man} 
              alt="Speaker at webinar" 
              className="h-full object-cover absolute max-sm:right-[80px] sm:right-[60px] lg:right-[140px]"
            />
          </div>

          {/* Decorative dots bottom right - hidden on mobile */}
          <div className="absolute bottom-8 right-8 max-sm:hidden">
            <div className="grid grid-cols-10 gap-2">
              {Array(80).fill().map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accroche;