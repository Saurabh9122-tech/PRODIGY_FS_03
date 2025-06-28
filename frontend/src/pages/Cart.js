import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // load cart
  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  // remove item
  const removeItem = (id) => {
    const updated = items.filter((i) => i._id !== id);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = items
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);

  const handleBuy = () => alert("Proceeding to payment (demo)");
  const handleTrack = () => alert("Order tracking page (demo)");

  if (items.length === 0)
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-3">Your Cart</h1>
        <p className="text-gray-600 mb-4">Cart is empty.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Shop
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item._id)}
                className="mt-2 text-red-600 underline text-sm"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-right mt-6">
        <p className="text-xl font-bold mb-4">Total: ₹{total}</p>

        <button
          onClick={handleBuy}
          className="bg-green-600 text-white px-4 py-2 rounded mr-4"
        >
          Buy
        </button>

        <button
          onClick={handleTrack}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Track Order
        </button>
      </div>
    </div>
  );
}
