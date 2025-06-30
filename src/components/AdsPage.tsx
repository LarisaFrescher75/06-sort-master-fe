
import React, { useState, useEffect } from 'react';
import CreateAdsForm from '../components/Header/CreateAdsForm';
import AdvertList from '../components/AdvertList';

interface Advert {
  id: number;
  title: string;
  description: string;
  photo: string;
}



export default function AdsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    fetch('/api/adverts')
      .then(res => res.json())
      .then(data => setAdverts(data))
      .catch(err => console.error('Error loading ads:', err));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/adverts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setAdverts(prev => prev.filter(ad => ad.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <CreateAdsForm />
      <h2 className="text-2xl font-bold my-4">Advertisements</h2>
      <AdvertList adverts={adverts} onDelete={handleDelete} />
    </div>
  );
}