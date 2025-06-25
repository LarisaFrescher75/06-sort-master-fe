
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Item {
  id: string;
  name: string;
  containerId: string; 
}

interface Container {
  id: string;
  name: string;
}

const ItemDetails: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [containerName, setContainerName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    fetch(`/api/items/${itemId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch item");
        return res.json();
      })
      .then((data: Item) => {
        setItem(data);
        
        return fetch(`/api/containers/${data.containerId}`);
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch container");
        return res.json();
      })
      .then((container: Container) => {
        setContainerName(container.name);
      })
      .catch(() => setError("Error loading data."));
  }, [itemId]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!item) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Item Details</h2>
      <p><strong>ID:</strong> {item.id}</p>
      <p><strong>Name:</strong> {item.name}</p>
      {containerName && (
        <p><strong>Container:</strong> {containerName}</p>
      )}
    </div>
  );
};

export default ItemDetails;