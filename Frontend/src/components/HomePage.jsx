import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("qc_cart") || "[]");
    const found = cart.find((item) => item.product._id === product._id);

    if (found) found.qty += 1;
    else cart.push({ product, qty: 1 });

    localStorage.setItem("qc_cart", JSON.stringify(cart));
    alert("Product added to cart!");
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded shadow p-4">
            <img
              src={p.image || "https://via.placeholder.com/150"}
              alt={p.name}
              className="rounded mb-3"
            />
            <div className="font-semibold">{p.name}</div>
            <div className="text-gray-600 text-sm mb-2">₹{p.price}</div>
            <button
              onClick={() => addToCart(p)}
              className="bg-indigo-600 text-white px-4 py-1 rounded mt-2"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
