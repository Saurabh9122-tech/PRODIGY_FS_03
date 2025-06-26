import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const goToCart = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl font-bold mb-4">🛍️ Local Store</h1>

      {/* Go to Cart Button */}
      <button
        onClick={goToCart}
        className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
      >
        🛒 Cart ({cart.length})
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {products.map(product => (
          <div key={product._id} className="border p-3 rounded shadow bg-white">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2 rounded" />
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-sm">{product.description}</p>
            <p className="text-green-600 font-bold mt-1">₹{product.price}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              onClick={() => addToCart(product)}
            >
              ➕ Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
