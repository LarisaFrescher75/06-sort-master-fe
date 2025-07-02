import React, { createContext, useState, type ReactNode, useContext } from 'react';

export interface Advert {
  id: number;
  title: string;
  description: string;
  photo: string;
}

interface AdvertContextType {
  adverts: Advert[];
  addAdvert: (advert: Omit<Advert, 'id'>) => void;
  deleteAdvert: (id: number) => void;
}

export const AdvertContext = createContext<AdvertContextType | undefined>(undefined);

export const AdvertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  const addAdvert = (advert: Omit<Advert, 'id'>) => {
    setAdverts((prev) => [
      ...prev,
      { ...advert, id: Date.now() }
    ]);
  };

  const deleteAdvert = (id: number) => {
    setAdverts((prev) => prev.filter((advert) => advert.id !== id));
  };

  return (
    <AdvertContext.Provider value={{ adverts, addAdvert, deleteAdvert }}>
      {children}
    </AdvertContext.Provider>
  );
};

// Custom hook to access the context
export const useAdvert = () => {
  const context = useContext(AdvertContext);
  if (!context) {
    throw new Error('useAdvert must be used within an AdvertProvider');
  }
  return context;
};

