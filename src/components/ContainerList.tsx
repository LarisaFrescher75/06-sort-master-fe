import React, { useEffect, useState } from "react";

interface Container {
  id: string;
  color: string;
  name: string;
  description: string;
}

interface Item {
  id: string;
  name: string;
}

const ContainerList = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [itemsByContainer, setItemsByContainer] = useState<{ [key: string]: Item[] }>({});
  const [newItems, setNewItems] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<Error | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/containers")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(setContainers)
      .catch(setError);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/containers/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete container");

      setContainers((prev) => prev.filter((container) => container.id !== id));
      setMessage("Container successfully removed.");

      
      setItemsByContainer((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (err) {
      console.error(err);
      setError(new Error("Failed to delete container"));
      setMessage("Error: Could not delete the container.");
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleInputChange = (containerId: string, value: string) => {
    setNewItems((prev) => ({ ...prev, [containerId]: value }));
  };

  const handleAddItem = async (containerId: string) => {
    const itemName = newItems[containerId]?.trim();
    if (!itemName) return;

    try {
      const res = await fetch(`/api/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: itemName, containerId: containerId }),
      });

      if (!res.ok) throw new Error("Failed to add item");

      const newItem: Item = await res.json();

      
      setItemsByContainer((prev) => ({
        ...prev,
        [containerId]: [...(prev[containerId] || []), newItem],
      }));

      setNewItems((prev) => ({ ...prev, [containerId]: "" }));
      setMessage(`Item "${itemName}" added.`);
    } catch (err) {
      console.error(err);
      setMessage("Error: Could not add item.");
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (error) {
    return <div className="text-red-500">Error loading containers.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.startsWith("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <ul className="space-y-4">
        {containers.map((container) => (
          <li
            key={container.id}
            className="p-4 rounded-lg shadow-md text-white relative"
            style={{ backgroundColor: container.color }}
          >
            <button
              onClick={() => handleDelete(container.id)}
              className="absolute top-2 right-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
            >
              Remove
            </button>

            <h3 className="text-xl font-semibold">{container.name}</h3>
            <p>{container.description}</p>

            {/* Список предметов */}
            <ul className="mt-2 ml-4 list-disc">
              {(itemsByContainer[container.id] || []).map((item) => (
                <li key={item.id} className="text-white text-sm">
                  {item.name}
                </li>
              ))}
            </ul>

            {/* Добавление нового предмета для контейнера */}
            <div className="mt-4 p-3 rounded border-2 border-yellow-300 bg-yellow-50">
              <input
                type="text"
                placeholder="New item name"
                value={newItems[container.id] || ""}
                onChange={(e) => handleInputChange(container.id, e.target.value)}
                className="px-3 py-2 rounded text-black mr-2"
              />
              <button
                onClick={() => handleAddItem(container.id)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Add Item
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContainerList;

















