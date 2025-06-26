import React from 'react';
import { useLocation } from 'react-router-dom';

function Cart() {
  const location = useLocation();
  const cart = location.state?.cart || [];

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cart.map((item, index) => (
              <div key={index} className="border p-4 rounded shadow bg-white">
                <img src={item.image} alt={item.name} className="h-40 w-full object-cover mb-2 rounded" />
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p>{item.description}</p>
                <p className="text-green-600 font-bold">₹{item.price}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 border rounded bg-gray-100 text-right">
            <h2 className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</h2>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
