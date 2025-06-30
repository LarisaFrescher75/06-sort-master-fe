


import React from 'react';
import AdvertCard from './AdvertCard';

interface Advert {
  id: number;
  title: string;
  description: string;
  photo: string;
}

interface AdvertListProps {
  adverts: Advert[];
  onDelete?: (id: number) => void;
}

const AdvertList: React.FC<AdvertListProps> = ({ adverts, onDelete }) => {
  return (
    <div className="space-y-4">
      {adverts.map((advert) => (
        <AdvertCard key={advert.id} advert={advert} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default AdvertList;