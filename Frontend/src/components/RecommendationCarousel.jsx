// src/components/RecommendationCarousel.jsx
import React from 'react';
export default function RecommendationCarousel({ items = [] }) {
  if (!items || items.length === 0) return <div className="text-sm text-gray-500">No recommendations yet</div>;

  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {items.map(it => (
        <div key={it._id} className="w-52 bg-white rounded shadow p-3 flex-shrink-0">
          <img src={it.image || 'https://via.placeholder.com/300x160'} className="h-28 w-full object-cover mb-2 rounded" alt="" />
          <div className="font-medium text-sm">{it.name}</div>
          <div className="text-xs text-gray-600">₹{it.price}</div>
        </div>
      ))}
    </div>
  );
}
