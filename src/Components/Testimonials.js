import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Thomas',
      image:
        'https://storage.googleapis.com/a1aa/image/a22e272f-dd58-45fe-e973-fb0ab87f4d6f.jpg',
      alt: 'Portrait of a man in a black suit with arms crossed, smiling',
      text: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s"',
    },
    {
      name: 'Emily',
      image:
        'https://storage.googleapis.com/a1aa/image/5eefaf09-e7eb-4410-19c3-7d039bd32ccb.jpg',
      alt: 'Portrait of a woman with long hair smiling, wearing a white top',
      text: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s"',
    },
  ];

  return (
    <div className="bg-indigo-900 py-16 px-4" style={{ backgroundColor: '#221858' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-yellow-300 text-sm font-medium tracking-wider uppercase mb-2">Testimonials</p>
          <h2 className="text-white text-3xl font-bold">What Our Customers Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500 opacity-10 rounded-full -mr-12 -mt-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-300 opacity-10 rounded-full -ml-8 -mb-8"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full ring-4 ring-purple-300 ring-opacity-30 mb-4 relative">
                  <img
                    src={t.image}
                    alt={t.alt}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-white font-semibold text-xl">{t.name}</h3>
                
                <div className="flex justify-center space-x-1 mt-1 text-yellow-400">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                </div>
                
                <div className="mt-6">
                  <svg className="w-8 h-8 text-purple-400 opacity-40 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-300 text-base leading-relaxed italic">
                    {t.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;