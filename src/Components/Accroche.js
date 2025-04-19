import React from 'react';
import ImageAccroche from '../Assets/AccrocheSection/AccrocheImage.png'; // Adjust the path as necessary

export default function Accroche() {
  return (
    <section className="font-montreal relative min-h-screen w-full flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={ImageAccroche}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute"></div>
      </div>

      {/* Content on top of the background */}
      <div className="relative z-10 max-w-[1080px] mx-auto px-6 ml-[350px] py-16 sm:py-20 lg:py-24 text-white">
        {/* Dotted square (top left) */}


        <div className="max-w-2xl">
          <p className="text-pink-300 text-[10px] font-semibold uppercase tracking-widest mb-2">
            Welcome to Evenza
          </p>
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl leading-tight mb-4">
            Plan Today,<br />Celebrate Tomorrow
          </h1>
          <p className="text-white text-[13px] leading-snug mb-8 max-w-md">
            With Evenza, organizing events has never been easier. From private parties to global conferences, we turn your vision into unforgettable moments—seamlessly and stress-free.
          </p>
          <button className="w-max bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 rounded-full text-white text-sm font-medium hover:brightness-110 transition">
            Get Started
          </button>
        </div>

        {/* Dotted square (bottom right) */}
        <div className="absolute bottom-6 right-6 w-24 h-24 grid grid-cols-6 grid-rows-6 gap-1 dots-bottom-right">
          <template id="dots-template-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-white opacity-60"></span>
          </template>
        </div>
      </div>
    </section>
  );
}
