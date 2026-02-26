import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("qc_token", res.data.token);
      localStorage.setItem("qc_user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>

        <label>Email</label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}
