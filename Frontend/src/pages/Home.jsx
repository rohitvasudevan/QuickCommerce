// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // assume you have this component
import RecommendationCarousel from '../components/RecommendationCarousel'; // optional component

export default function Home() {
  const [products, setProducts] = useState([]);
  const [recs, setRecs] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchProducts() {
      try {
        setLoadingProducts(true);
        const resp = await axios.get('http://localhost:5000/api/products');
        if (mounted) setProducts(resp.data || []);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
    return () => { mounted = false; };
  }, []);

  // Request recommendations (server returns JSON array of { productId, score, reason } or fallback)
  useEffect(() => {
    if (!products?.length) return;
    let mounted = true;
    async function fetchRecs() {
      try {
        // send available product metadata and (optionally) user history
        const user = JSON.parse(localStorage.getItem('qc_user') || 'null');
        const orderHistory = []; // could fetch order history from API if available
        const body = { products, orderHistory };
        const resp = await axios.post('http://localhost:5000/api/recommend', body);
        const data = resp.data;
        if (!mounted) return;
        // If LLM returned array with productId
        if (Array.isArray(data)) {
          const ids = data.map(r => String(r.productId));
          setRecs(products.filter(p => ids.includes(String(p._id))));
        } else if (data?.raw) {
          console.warn('Recommendation returned raw text:', data.raw);
          setRecs([]); // fallback
        } else {
          setRecs([]); // fallback
        }
      } catch (err) {
        console.error('Recommendation error', err);
      }
    }
    fetchRecs();
    return () => { mounted = false; };
  }, [products]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quick Commerce</h1>

      <section className="mb-8">
        <h2 className="text-xl mb-3">Recommended for you</h2>
        <div className="bg-white p-4 rounded shadow">
          <RecommendationCarousel items={recs} />
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3">All products</h2>
        {loadingProducts ? (
          <div className="p-6 bg-white rounded shadow">Loading products…</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
