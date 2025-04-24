'use client';
import React from 'react';

const events = [
  {
    date: '15',
    month: 'February',
    year: '2024',
    name: 'Event Name Here',
    location: '135 W, 46nd Street, New York',
    time: '9:15am - 2:15pm',
  },
  {
    date: '15',
    month: 'February',
    year: '2024',
    name: 'Event Name Here',
    location: '135 W, 46nd Street, New York',
    time: '9:15am - 2:15pm',
  },
  {
    date: '15',
    month: 'February',
    year: '2024',
    name: 'Event Name Here',
    location: '135 W, 46nd Street, New York',
    time: '9:15am - 2:15pm',
  },
  {
    date: '15',
    month: 'February',
    year: '2024',
    name: 'Event Name Here',
    location: '135 W, 46nd Street, New York',
    time: '9:15am - 2:15pm',
  },
  {
    date: '15',
    month: 'February',
    year: '2024',
    name: 'Event Name Here',
    location: '135 W, 46nd Street, New York',
    time: '9:15am - 2:15pm',
  },
];

const EventCard = ({ event }) => (
    
//   <div className="flex max-sm:flex-col sm:flex-row sm:items-center sm:justify-between py-10 mx-[-30px] max-sm:flex max-sm:justify-center max-sm:items-center max-sm:mx-0 max-sm:py-6 border-b border-[#2d2670]">
<div className="flex max-sm:flex-col sm:flex-row sm:items-center sm:justify-between py-10 mx-[-30px] mt-[-25px] max-sm:flex max-sm:justify-center ">
    <div className="flex items-start w-32 max-sm:mb-6">
      <div className="text-white text-5xl font-bold ">{event.date}</div>
      <div className="text-white text-sm leading-tight mt-2 ">
        <p>{event.month}</p>
        <p>{event.year}</p>
      </div>
    </div>
    
    <div className="flex-1  ml-[120px] sm:ml-[45px] max-sm:ml-0 max-sm:mb-6">
      <h2 className="text-white text-xl font-medium mb-3">{event.name}</h2>
      <div className="flex max-sm:flex-col max-sm:space-y-3 sm:items-center sm:space-x-6 text-sm text-gray-300">
        <div className="flex items-center">
          <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{event.location}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>{event.time}</span>
        </div>
      </div>
    </div>
    
    <div className="sm:ml-4 max-sm:mt-2">
      <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2  rounded-full border border-white hover:opacity-90 transition">
        Get Tickets
      </button>
    </div>
  </div>
);

const Events = () => (
  <div className="min-h-screen flex items-center justify-center p-6 pt-[110px] sm:mx-[60px] max-sm:mx-[40px] ">
    <div className="max-w-4xl w-full">
      <div className="text-center mb-[69px] max-sm:mt-[-35px] max-sm:mb-[40px] ">
        <p className="text-white text-sm mb-1 ">Schedule Of Event</p>
        <h1 className="text-white text-2xl font-medium">
          List Of Events Planned In this Conference
        </h1>
      </div>
      
      <div className="divide-y divide-[#2d2670]">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  </div>
);

export default Events;