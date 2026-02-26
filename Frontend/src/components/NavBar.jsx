// src/components/NavBar.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('qc_user');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  // Handle logout
  function handleSignOut() {
    localStorage.removeItem('qc_token');
    localStorage.removeItem('qc_user');
    setUser(null);
    navigate('/login');
  }

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        QuickCommerce
      </Link>

      {/* Right side navigation */}
      <div className="flex items-center gap-6 text-sm font-medium">
        
        {/* Cart link */}
        <Link to="/cart" className="hover:text-indigo-600">
          Cart
        </Link>

        {/* Conditionally render Sign In / Sign Out */}
        {!user ? (
          <Link
            to="/login"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Sign In
          </Link>
        ) : (
          <>
            <span className="text-gray-600">
              Hello, <strong>{user.name}</strong>
            </span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
