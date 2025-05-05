import React, { useState } from 'react';

const educationData = [
  {
    title: 'Matriculation',
    institution: "RKM Rahara, Kol",
    duration: 'Completed May 2018',
  },
  {
    title: 'Intermediate',
    institution: "RKM Rahara, Kol",
    duration: 'Completed May 2020',
  },
  {
    title: 'Bachelor of Technology',
    institution: 'National Institute of Technology Durgapur',
    duration: '2020 to 2024',
    isPresent: false,
  },
];

const workData = [
  {
    title: 'Summer Intern',
    institution: 'IISC Bangalore',
    duration: 'April 2023 to July 2023',
  },
  {
    title: 'GET, Logistics',
    institution: 'JSW Steel',
    duration: 'Aug 2024 to Present',
    isPresent: true,
  },
];

const Timeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'work'>('education');
  const data = activeTab === 'education' ? educationData : workData;

  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">QUALIFICATION</h2>
        <p className="text-lg text-gray-600">My Journey</p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md font-medium ${
              activeTab === 'education'
                ? 'bg-blue-600 text-white'
                : 'border-blue-600 text-blue-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
            Education
          </button>
          <button
            onClick={() => setActiveTab('work')}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md font-medium ${
              activeTab === 'work'
                ? 'bg-blue-600 text-white'
                : 'border-blue-600 text-blue-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            Work
          </button>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="relative">
          {data.map((item, idx) => {
            const isLeft = idx % 2 === 0; // First item (idx 0) on left, second (idx 1) on right, and so on
            const isLast = idx === data.length - 1;

            return (
              <div
                key={idx}
                className={`grid grid-cols-9 gap-4 relative z-10 ${isLast ? 'pb-0' : 'pb-8'}`}
              >
                {/* Left content */}
                <div className={`col-span-4 ${isLeft ? 'text-right pr-6' : ''}`}>
                  {isLeft && (
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.institution}</p>
                      <p
                        className={`text-sm ${
                          item.isPresent ? 'text-blue-600 font-bold' : 'text-gray-500'
                        }`}
                      >
                        {item.duration}
                      </p>
                    </div>
                  )}
                </div>

                {/* Dot */}
                <div className="col-span-1 flex justify-center relative">
                  <div className="w-4 h-4 bg-blue-600 rounded-full z-10"></div>
                </div>

                {/* Line (except for the last item) */}
                {isLast ? null : (
                  <div
                    className="col-span-1 absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 z-0"
                    style={{
                      top: '16px', // Start from the bottom of the dot (8px radius + 8px to bottom)
                      bottom: '0', // Extend to the top of the next item
                    }}
                  ></div>
                )}

                {/* Right content */}
                <div className={`col-span-4 ${!isLeft ? 'text-left pl-6' : ''}`}>
                  {!isLeft && (
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.institution}</p>
                      <p
                        className={`text-sm ${
                          item.isPresent ? 'text-blue-600 font-bold' : 'text-gray-500'
                        }`}
                      >
                        {item.duration}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;