import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Local Store</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product._id} className="border p-3 rounded shadow">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
            <h2 className="font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-green-600 font-bold">₹{product.price}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
