
import React from "react";

interface ItemProps {
  item: {
    id: number;
    name: string;
    containerId: number;
  };
}

const ItemCard: React.FC<ItemProps> = ({ item }) => {
  return (
    <div className="p-4 rounded-lg shadow-md text-white" style={{ backgroundColor: "#4A90E2" }}>
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p>Container ID: {item.containerId}</p>
      <p>ID: {item.id}</p>
    </div>
  );
};

export default ItemCard;