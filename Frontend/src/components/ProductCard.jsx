// src/components/ProductCard.jsx
import React from 'react';

export default function ProductCard({ product }) {
  function addToCart() {
    const raw = localStorage.getItem('qc_cart') || '[]';
    const cart = JSON.parse(raw);
    const found = cart.find(it => it.product._id === product._id);
    if (found) found.qty += 1;
    else cart.push({ product, qty: 1 });
    localStorage.setItem('qc_cart', JSON.stringify(cart));
    alert('Added to cart');
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <img src={product.image || 'https://via.placeholder.com/300x180'} alt="" className="w-full h-40 object-cover mb-3 rounded" />
      <div className="font-medium">{product.name}</div>
      <div className="text-sm text-gray-600 mb-2">₹{product.price}</div>
      <button onClick={addToCart} className="px-3 py-1 bg-indigo-600 text-white rounded">Add to cart</button>
    </div>
  );
}
