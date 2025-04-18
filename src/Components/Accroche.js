import React, { useEffect } from 'react';

export default function Accroche() {
  useEffect(() => {
    const fillDots = (containerSelector, id) => {
      const container = document.querySelector(containerSelector);
      const template = document.getElementById(id);
      if (container && template) {
        for (let i = 0; i < 36; i++) {
          container.appendChild(template.content.cloneNode(true));
        }
      }
    };

    fillDots('.dots-top-left', 'dots-template');
    fillDots('.dots-bottom-right', 'dots-template-2');
  }, []);

  return (
    <section className="relative max-w-[1080px] mx-auto px-6 py-16 sm:py-20 lg:py-24 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-0 bg-[#1B1B4B]">
      {/* Left side content */}
      <div className="relative flex-1 flex flex-col justify-center text-white max-w-xl">
        {/* Top left dotted square */}
        <div className="absolute top-0 left-0 w-24 h-24 grid grid-cols-6 grid-rows-6 gap-1 dots-top-left">
          <template id="dots-template">
            <span className="block w-1.5 h-1.5 rounded-full bg-white opacity-60"></span>
          </template>
        </div>

        <p className="text-pink-500 text-[10px] font-semibold uppercase tracking-widest mb-2">
          Upcoming New Event 2024
        </p>
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl leading-tight mb-4">
          World Biggest
          <br />
          Webinar
        </h1>
        <p className="text-white text-[13px] leading-snug mb-8 max-w-md">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
        </p>
        <button className="w-max bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 rounded-full text-white text-sm font-medium hover:brightness-110 transition">
          Get Tickets
        </button>
      </div>

      {/* Right side image with background */}
      <div className="relative flex-1 rounded-tl-[80px] rounded-bl-[80px] overflow-hidden max-w-[400px] sm:max-w-none sm:flex-1">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-700 rounded-tl-[80px] rounded-bl-[80px]"></div>
        <img
          src="https://storage.googleapis.com/a1aa/image/807cad86-347d-4d9d-87f6-c62c119360f0.jpg"
          alt="Man holding mic"
          className="relative object-cover w-full h-full rounded-tl-[80px] rounded-bl-[80px]"
        />

        {/* Bottom right dotted square */}
        <div className="absolute bottom-6 right-6 w-24 h-24 grid grid-cols-6 grid-rows-6 gap-1 dots-bottom-right">
          <template id="dots-template-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-white opacity-60"></span>
          </template>
        </div>
      </div>
    </section>
  );
}
