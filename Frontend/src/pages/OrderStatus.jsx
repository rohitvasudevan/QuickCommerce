// src/pages/OrderStatus.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function OrderStatus() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let iv;

    async function fetchOne() {
      try {
        const resp = await axios.get(`http://localhost:5001/api/orders/${id}`);
        if (!mounted) return;
        setOrder(resp.data);
        setLoading(false);
      } catch (err) {
        console.error('Order fetch error', err);
        setLoading(false);
      }
    }

    fetchOne();
    iv = setInterval(fetchOne, 2000);
    return () => { mounted = false; clearInterval(iv); };
  }, [id]);

  if (loading) return <div className="p-6">Loading order...</div>;
  if (!order) return <div className="p-6">Order not found. <Link to="/">Back to home</Link></div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-3">Order status</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="mb-2">Order ID: <span className="font-mono">{order._id}</span></div>
        <div className="mb-2">Current status: <strong>{order.status}</strong></div>
        <div className="mb-2">Created at: {new Date(order.createdAt).toLocaleString()}</div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Lifecycle</h3>
        <ul className="space-y-2">
          {order.lifecycle?.map((ev, idx) => (
            <li key={idx} className="border rounded p-2">
              <div className="text-sm text-gray-500">{new Date(ev.timestamp).toLocaleString()}</div>
              <div className="font-medium">{ev.status}</div>
              <div className="text-sm text-gray-700">{ev.message}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="font-semibold mb-2">Fulfilment</h3>
        <div>Warehouse: {order.assignedWarehouse?.name || '—'}</div>
        <div>Warehouse coords: {order.assignedWarehouse?.coords ? `${order.assignedWarehouse.coords.x}, ${order.assignedWarehouse.coords.y}` : '—'}</div>
        <div className="mt-2">Hotspot: {order.assignedHotspot?.name || '—'}</div>
        <div>Hotspot coords: {order.assignedHotspot?.coords ? `${order.assignedHotspot.coords.x}, ${order.assignedHotspot.coords.y}` : '—'}</div>
      </div>

      <div className="mt-4">
        <Link to="/" className="text-blue-600">Back to home</Link>
      </div>
    </div>
  );
}
