



import React from 'react';



interface Advert {
  id: number;
  title: string;
  description: string;
  photo: string;
  
  onDelete?: (id: number) => void;
}

const AdvertCard: React.FC<{ advert: Advert; onDelete?: (id: number) => void }> = ({ advert, onDelete }) => {
  return (
    <div className="border rounded p-4 shadow mb-4 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-2">{advert.title}</h2>
      <img src={advert.photo} alt={advert.title} className="w-full h-48 object-cover mb-2" />
      <p className="mb-2">{advert.description}</p>
      {onDelete && (
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => onDelete(advert.id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default AdvertCard;