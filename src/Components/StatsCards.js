import React from "react";

const stats = [
  {
    value: "10.000",
    description: "Conference\ntickets confirmed",
    bgColor: "bg-pink-600",
  },
  {
    value: "8+",
    description: "Powered partners\nspeakers",
    bgColor: "bg-orange-500",
  },
  {
    value: "40+",
    description: "Participants from different\ncountries",
    bgColor: "bg-indigo-600",
  },
  {
    value: "100+",
    description: "Sponsor of big company",
    bgColor: "bg-blue-600",
  },
];

// Wave pattern SVG components for each card
const WavePattern = ({ color }) => {
  // Different wave patterns based on color
  const getWavePattern = () => {
    if (color === "bg-pink-600") {
      return (
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wavePattern1" patternUnits="userSpaceOnUse" width="100" height="8" patternTransform="rotate(0)">
            <path d="M0,4 C10,0 20,8 30,4 C40,0 50,8 60,4 C70,0 80,8 90,4 C100,0 110,8 120,4 L100,8 L0,8 Z" fill="#BF2256"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#wavePattern1)"/>
        </svg>
      );
    } else if (color === "bg-orange-500") {
      return (
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wavePattern2" patternUnits="userSpaceOnUse" width="100" height="10" patternTransform="rotate(0)">
            <path d="M0,4 C10,0 20,8 30,4 C40,0 50,8 60,4 C70,0 80,8 90,4 C100,0 110,8 120,4 L100,8 L0,8 Z" fill="#C05826"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#wavePattern2)"/>
        </svg>
      );
    } else if (color === "bg-indigo-600") {
      return (
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wavePattern3" patternUnits="userSpaceOnUse" width="100" height="12" patternTransform="rotate(0)">
            <path d="M0,4 C10,0 20,8 30,4 C40,0 50,8 60,4 C70,0 80,8 90,4 C100,0 110,8 120,4 L100,8 L0,8 Z" fill="#303CA0"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#wavePattern3)"/>
        </svg>
      );
    } else {
      return (
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wavePattern4" patternUnits="userSpaceOnUse" width="100" height="8" patternTransform="rotate(0)">
              <path d="M0,4 C10,0 20,8 30,4 C40,0 50,8 60,4 C70,0 80,8 90,4 C100,0 110,8 120,4 L100,8 L0,8 Z" fill="#303CA0"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#wavePattern4)"/>
        </svg>
      );
    }
  };

  return getWavePattern();
};

const StatsCards = () => {
  return (
    <div className="py-8 max-sm:py-6 sm:my-12 lg:my-20 sm:mx-6 lg:mx-12 flex items-center justify-center">
      <div className="flex flex-col max-sm:items-center gap-4 sm:gap-6 lg:gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4 max-w-6xl w-full justify-center">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg py-6 max-sm:py-4 text-white font-semibold text-center 
                      max-sm:w-64 sm:w-full md:w-full lg:w-full
                      ${item.bgColor} relative overflow-hidden`}
          >
            <WavePattern color={item.bgColor} />
            <div className="relative z-10">
              <div className="text-2xl max-sm:text-xl lg:text-3xl font-extrabold leading-none">{item.value}</div>
              <div className="text-sm max-sm:text-xs lg:text-base font-normal mt-1 leading-tight whitespace-pre-line">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;