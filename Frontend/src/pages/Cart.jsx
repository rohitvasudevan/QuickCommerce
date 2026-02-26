// src/pages/Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('qc_cart') || '[]';
    try { setCart(JSON.parse(raw)); } catch { setCart([]); }
  }, []);

  function updateLocalCart(newCart) {
    setCart(newCart);
    localStorage.setItem('qc_cart', JSON.stringify(newCart));
  }

  function removeItem(index) {
    const c = cart.slice();
    c.splice(index, 1);
    updateLocalCart(c);
  }

  function changeQty(index, nextQty) {
    const c = cart.map((it, idx) => idx === index ? { ...it, qty: Math.max(1, nextQty) } : it);
    updateLocalCart(c);
  }

  async function handleCheckout() {
    const token = localStorage.getItem('qc_token');
    if (!token) {
      alert('Please login before checkout');
      return navigate('/login');
    }
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    setCheckingOut(true);
    try {
      // For simplicity we ask user coords via prompt (replace with good UI)
      const x = parseFloat(prompt('Enter your X coordinate (e.g., 15)') || '15');
      const y = parseFloat(prompt('Enter your Y coordinate (e.g., 12)') || '12');
      const userCoords = { x, y };

      // 1) find nearest warehouse & hotspot
      const nearestResp = await axios.post('http://localhost:5000/api/warehouse/nearest', { userCoords });
      const { warehouse, hotspot } = nearestResp.data;

      // 2) build items
      const items = cart.map(i => ({
        productId: i.product._id,
        qty: i.qty,
        priceAtPurchase: i.product.price
      }));

      // 3) place order in order-processing server
      const payload = {
        items,
        assignedWarehouse: warehouse,
        assignedHotspot: hotspot,
        userCoords
      };
      const orderResp = await axios.post('http://localhost:5001/api/orders/place', payload);
      const orderId = orderResp.data.orderId;

      // clear cart and navigate to order status
      updateLocalCart([]);
      navigate(`/order/${orderId}`);
    } catch (err) {
      console.error('Checkout failed', err);
      alert('Checkout failed: ' + (err?.response?.data?.error || err.message || 'unknown'));
    } finally {
      setCheckingOut(false);
    }
  }

  const subtotal = cart.reduce((s, it) => s + (it.qty * (it.product.price || 0)), 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">Your cart is empty.</div>
      ) : (
        <div className="bg-white p-6 rounded shadow">
          {cart.map((it, idx) => (
            <div key={idx} className="flex items-center justify-between border-b py-3">
              <div>
                <div className="font-medium">{it.product.name}</div>
                <div className="text-sm text-gray-500">₹{it.product.price} each</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => changeQty(idx, it.qty - 1)} className="px-2 py-1 border rounded">-</button>
                <div>{it.qty}</div>
                <button onClick={() => changeQty(idx, it.qty + 1)} className="px-2 py-1 border rounded">+</button>
                <div className="ml-4">₹{it.qty * it.product.price}</div>
                <button onClick={() => removeItem(idx)} className="ml-4 text-red-600">Remove</button>
              </div>
            </div>
          ))}

          <div className="mt-4 text-right">
            <div className="text-lg font-semibold">Subtotal: ₹{subtotal}</div>
            <button
              onClick={handleCheckout}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
              disabled={checkingOut}
            >
              {checkingOut ? 'Processing order...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
