import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // ─── Load cart ────────────────────────
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(data);
  }, []);

  // ─── Remove item ──────────────────────
  const removeItem = (id) => {
    const updated = items.filter((i) => i._id !== id);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ─── Total ────────────────────────────
  const total = items
    .reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0)
    .toFixed(2);

  // ─── Buy (save order) ─────────────────
  const handleBuy = () => {
    const order = {
      items,
      total,
      status: "Ready to Place",
      placedAt: new Date().toISOString(),
    };
    localStorage.setItem("order", JSON.stringify(order));
    localStorage.removeItem("cart");
    navigate("/buy");
  };

  // ─── Track order ──────────────────────
  const handleTrack = () => {
    const order = JSON.parse(localStorage.getItem("order"));
    if (!order) {
      alert("No order found.");
      return;
    }

    let nextStatus = "Ready to Place";
    if (order.status === "Ready to Place") nextStatus = "On the Way";
    else if (order.status === "On the Way") nextStatus = "Delivered";
    else nextStatus = "Delivered";

    order.status = nextStatus;
    localStorage.setItem("order", JSON.stringify(order));
    alert(`Order Status: ${nextStatus}`);
  };

  // ─── If cart is empty ─────────────────
  if (items.length === 0) {
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
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pb-28">
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
                  ₹{item.price?.toFixed(2)} × {item.quantity || 1}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-700">
                ₹{(item.price * (item.quantity || 1)).toFixed(2)}
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

      {/* ─── Bottom Bar ───────────────── */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-between items-center max-w-4xl mx-auto">
        <p className="text-xl font-bold text-blue-700">Total: ₹{total}</p>
        <div className="space-x-3">
          <button
            onClick={handleBuy}
            className="bg-green-600 text-white px-4 py-2 rounded"
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
    </div>
  );
}
