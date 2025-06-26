import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    }
    fetch();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(prod => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </div>
    </div>
  );
}
