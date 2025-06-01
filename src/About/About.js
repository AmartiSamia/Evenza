import React from 'react';
import ManStanding from './../Assets/About/ManStanding.png';
import People from './../Assets/About/People.png';
import Video from './../Assets/About/Video.png';

const About = () => {
  return (
    <section className="max-w-7xl mx-auto pl-36 py-[116px] bg-[#F8F6FF] font-inter max-sm:mb-[-65px]">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20">
        {/* Left side images container */}
        <div className="relative flex-shrink-0 ml-[-169px] mt-[-50px] md:mt-0 md:ml-0">
          {/* Large image with rounded corners */}
          <img
            src={ManStanding}
            alt="Man speaking on stage in front of an audience in a wooden auditorium " 
            className="rounded-2xl lg:w-[360px] lg:h-[340px] max-sm:w-[250px] max-sm:mt-[-20px] max-sm:h-[250px] sm:w-[300px] sm:h-[300px] sm:ml-[-0px] object-cover"
            width="420"
            height="420"
          />

          {/* Purple stroke lines behind images */}
          <svg
            className="hidden md:block absolute top-6 -left-10 w-28 h-28 stroke-[#2a2a5c] stroke-[1.5]"
            fill="none"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="20" width="60" height="60" rx="10" ry="10" />
            <rect x="40" y="1" width="60" height="60" rx="10" ry="10" />
          </svg>

          
          <img
            src={Video}
            alt="Audience watching an event, seated and smiling"
            className="absolute bottom-0 left-0 right-[0px] w-[150px] h-[120px] max-sm:w-[100px] max-sm:h-[80px] rounded-xl object-cover bg-pink-600"
            width="140"
            height="140"
          />
          {/* Smaller image bottom right */}
          <img
            src={People}
            alt="Audience watching an event, seated and smiling"
            className="absolute bottom-0 right-[-85px] max-sm:w-[120px] max-sm:h-[120px] max-sm:right-[-40px] w-[180px] h-[170px] rounded-xl object-cover "
            width="240"
            height="240"
          />
        </div>

        {/* Right side text content */}
        <div className="max-w-xl sm:ml-[-100px] max-sm:ml-[-130px] max-sm:px-5 lg:ml-[25px]">
          <p className="text-sm mb-2 ">About Us</p>
          <h2 className="lg:text-2xl font-semibold mb-4  max-sm:mb-[10px] ">Know More About Event</h2>
          <p className="text-sm leading-relaxed mb-8  max-sm:mb-[10px] ">
         Evenza is your go-to platform for easy event planning and registration. Whether you're hosting or attending, we make the process smooth, fast, and reliable. Built with the latest tech, Evenza helps you plan today and enjoy tomorrow—stress-free.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              <img
                src="https://storage.googleapis.com/a1aa/image/19a25f92-b599-4bef-7040-c4a296b6b699.jpg"
                alt="Speaker 1 portrait"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://storage.googleapis.com/a1aa/image/f3aed4a6-e502-4d55-d6d6-48de2c272e72.jpg"
                alt="Speaker 2 portrait"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://storage.googleapis.com/a1aa/image/41c46d7e-cd81-4741-a252-dd222ed2ced8.jpg"
                alt="Speaker 3 portrait"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
            <div className="bg-[#2a2a5c] text-white text-xs font-semibold rounded-full w-8 h-8 flex items-center justify-center">
              5+
            </div>
            <span className="text-sm font-semibold">Speakers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
