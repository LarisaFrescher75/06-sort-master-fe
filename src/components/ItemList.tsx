import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
  containerId: number;
}

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Item[]) => setItems(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error)
    return <div className="text-red-500">Error loading items: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Items List</h2>
      <ul className="space-y-4">
        {items.map((item: Item) => (
          <li
            key={item.id}
            className="p-4 rounded-lg shadow-md text-white"
            style={{ backgroundColor: "#4A90E2" }} 
          >
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p>Container ID: {item.containerId}</p>
            <p>ID: {item.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;