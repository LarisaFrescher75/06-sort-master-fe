

import React, { useState } from 'react';
import { type Advert } from '../contexts/AdvertContext';

const AdvertCarousel: React.FC<{ adverts: Advert[] }> = ({ adverts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? adverts.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === adverts.length - 1 ? 0 : prev + 1));
  };

  if (adverts.length === 0) return <p>No ads</p>;

  const currentAdvert = adverts[currentIndex];

  return (
    <div className="relative max-w-md mx-auto border rounded p-4 bg-white shadow-lg">
      <h2 className="text-xl font-semibold mb-2">{currentAdvert.title}</h2>
      <img src={currentAdvert.photo} alt={currentAdvert.title} className="w-full h-48 object-cover mb-2" />
      <p>{currentAdvert.description}</p>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
        onClick={prevSlide}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default AdvertCarousel;