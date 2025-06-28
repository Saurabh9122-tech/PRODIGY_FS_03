import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Buy() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && !address.trim()) {
      return alert("Please enter a delivery address.");
    }
    setStep(step + 1);
  };

  const handleReturnHome = () => {
    localStorage.removeItem("cart"); // clear cart after purchase
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* ─── Step 1 : Address ───────────────────────────────────────────── */}
      {step === 1 && (
        <>
          <label className="block font-semibold mb-2">
            Shipping Address:
          </label>
          <textarea
            rows="4"
            className="w-full border p-2 rounded mb-4"
            value={address}
            placeholder="Flat / House No. · Street · City · Pincode"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Continue →
          </button>
        </>
      )}

      {/* ─── Step 2 : Payment ───────────────────────────────────────────── */}
      {step === 2 && (
        <>
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <div className="p-4 border rounded bg-gray-50">
            <p>✅ Cash&nbsp;on&nbsp;Delivery</p>
            <small className="text-gray-500">
              (You’ll pay when the package arrives.)
            </small>
          </div>

          <button
            onClick={handleNext}
            className="bg-green-600 text-white mt-6 px-6 py-2 rounded"
          >
            Place Order
          </button>
        </>
      )}

      {/* ─── Step 3 : Tracking ──────────────────────────────────────────── */}
      {step === 3 && (
        <>
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>
          <ul className="space-y-2 ml-4 list-decimal">
            <li className="font-bold text-green-700">Order Placed ✔️</li>
            <li className="font-bold text-yellow-600">On the Way 🚚</li>
            <li className="font-bold text-gray-500">Delivered (pending) 📦</li>
          </ul>

          <button
            onClick={handleReturnHome}
            className="bg-blue-600 text-white mt-6 px-6 py-2 rounded"
          >
            Back to Shop
          </button>
        </>
      )}
    </div>
  );
}
