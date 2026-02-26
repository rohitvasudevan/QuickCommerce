// Frontend/src/components/OrderConfirmation.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    let alive = true;

    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/orders/${id}`);
        if (alive) setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 2000);

    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, [id]);

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-2">Order Confirmation</h2>
      <p className="mb-4">Order ID: <strong>{order._id}</strong></p>

      <h3 className="font-semibold mt-4">Items</h3>
      <ul className="mb-4">
        {order.items.map((it, idx) => (
          <li key={idx}>
            Product ID: {it.productId} — Qty: {it.qty}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold">Status Updates</h3>
      <ul>
        {order.lifecycle.map((l, idx) => (
          <li key={idx}>
            {new Date(l.timestamp).toLocaleTimeString()} — <strong>{l.status}</strong> — {l.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
