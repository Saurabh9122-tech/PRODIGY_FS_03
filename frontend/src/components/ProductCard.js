import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded overflow-hidden shadow hover:shadow-lg">
      <img src={product.image} alt={product.name} className="h-48 w-full object-cover"/>
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <p className="text-sm my-2">{product.description.substring(0, 60)}...</p>
        <Link to={`/cart`} className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded">Add to cart</Link>
      </div>
    </div>
  );
}
