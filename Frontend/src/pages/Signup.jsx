// src/pages/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Create an account</h1>

        <label className="block mb-2 text-sm">Full name</label>
        <input
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block mb-2 text-sm">Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block mb-2 text-sm">Password</label>
        <input
          required
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded" disabled={loading}>
          {loading ? 'Creating...' : 'Create account'}
        </button>

        <div className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Log in</Link>
        </div>
      </form>
    </div>
  );
}
