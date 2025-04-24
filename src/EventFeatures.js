import React from 'react';

const EventFeatures = () => {
  // Feature card data
  const features = [
    {
      id: 1,
      title: "Speaker Lineup",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      id: 2,
      title: "Speaker Lineup",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      id: 3,
      title: "Speaker Lineup",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      id: 4,
      title: "Speaker Lineup",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }
  ];

  // Custom Feature Icon Component with circle pink background
  const FeatureIcon = () => (
    <div className="mb-4 ">
      <div className="relative w-16 h-16 max-sm:w-12 max-sm:h-12 ">
        {/* Pink shadow/glow effect */}
        <div className="absolute -top-1 -left-1 w-18 h-18 max-sm:w-13 max-sm:h-13 bg-pink-100 rounded-full opacity-50 blur-sm"></div>
        
        {/* Pink circle background */}
        <div className="absolute top-0 left-0 w-16 h-16 max-sm:w-12 max-sm:h-12 bg-pink-500 rounded-full"></div>
        
        {/* Icon centered on the pink background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Speaker at podium icon */}
            <rect x="4" y="5" width="16" height="10" rx="1" />
            <text x="7" y="11" fontSize="5" fill="none" stroke="currentColor">+</text>
            <text x="14" y="11" fontSize="5" fill="none" stroke="currentColor">-</text>
            <path d="M12 15v6" />
            <rect x="8" y="18" width="8" height="3" rx="1" />
            <circle cx="12" cy="8" r="1.5" />
            <path d="M9.5 10v2" />
            <path d="M14.5 10v2" />
            <path d="M10 12h4" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-[109px] max-sm:pt-[60px] mb-12 max-sm:mb-[-20px]">
      <div className="text-center mb-12">
        <p className="text-sm text-gray-600 mb-2">
          Event Features
        </p>
        <h2 className="text-3xl font-semibold text-black max-sm:text-xl max-sm:mb-[-30px]">
          Unifying For A Better World
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 pt-[20px]">
        {features.map((feature) => (
        <div 
        key={feature.id} 
        className="bg-white rounded-lg p-6 relative overflow-visible shadow-[0_4px_20px_rgba(0,0,0,0.1)] group hover:shadow-[0_6px_25px_rgba(0,0,0,0.15)] hover:translate-y-1 hover:transform transition-transform duration-300"
      >
            <FeatureIcon />
            <h3 className="font-semibold text-lg mb-2 max-sm:text-1xl">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-sm:text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventFeatures;