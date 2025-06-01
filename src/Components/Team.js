import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import image from "../Assets/PIc.jpg";

const team = [
  {
    name: 'Name',
    role: 'UI Designer',
    image: 'https://storage.googleapis.com/a1aa/image/76507a03-696c-4299-5334-26f3ad9b5f8b.jpg',
  },
  {
    name: 'Name',
    role: 'Developer',
    image: 'https://storage.googleapis.com/a1aa/image/4040a3ec-8349-4530-2736-09fde1cfd990.jpg',
  },
  {
    name: 'Name',
    role: 'Event Organizer',
    image: 'https://storage.googleapis.com/a1aa/image/5597f54e-9ede-4447-27c8-a79e65055fbd.jpg',
  },
  {
    name: 'Name',
    role: 'Marketing Coordinator',
    image: 'https://storage.googleapis.com/a1aa/image/402a7620-565c-4b71-5faa-c8dc71f51adc.jpg',
  },
];

const TeamCard = ({ name, role, image }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <div className="rounded-full border border-[#d6d6f7] w-[140px] h-[140px] flex items-center justify-center">
        <div className="absolute top-0 left-0 w-[140px] h-[140px] rounded-full border border-[#d6d6f7]" />
        <div className="absolute top-1 left-1 w-[138px] h-[138px] rounded-full border border-[#d6d6f7]" />
        <img
          src={image}
          alt={name}
          className="rounded-full w-[120px] h-[120px] object-cover relative z-10"
          width="120"
          height="120"
        />
      </div>
      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-2 flex space-x-4 shadow-md z-20">
        <a href="#" className="text-[#1a237e] hover:text-[#3949ab] text-[14px]">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-[#1a237e] hover:text-[#3949ab] text-[14px]">
          <i className="fab fa-x-twitter"></i>
        </a>
        <a href="#" className="text-[#1a237e] hover:text-[#3949ab] text-[14px]">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="#" className="text-[#1a237e] hover:text-[#3949ab] text-[14px]">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
    <h3 className="mt-12 text-[18px] font-semibold">{name}</h3>
    <p className="text-[12px] text-gray-600 mt-1">{role}</p>
  </div>
);

const Team = () => (
  <div className="flex items-center justify-center p-6 py-[90px] bg-white">
    <section className="w-full max-w-7xl text-center">
      <p className="text-[12px] text-black mb-1 uppercase tracking-widest">Event Team</p>
      <h2 className="text-[24px] font-semibold mb-10">Meet Our Team</h2>
      <div className="flex flex-wrap justify-center gap-x-16 gap-y-10">
        {team.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </section>
  </div>
);

export default Team;
