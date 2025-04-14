'use client';

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // will eventually send to backend or validate login
  };

  return (
    <div className="min-h-screen pl-[100px] py-10 px-6 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-black">
      <h1 className="text-3xl font-bold mb-6">Login to LoFiLive</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-300 shadow-sm"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-300 shadow-sm"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-sm">
        Need to make an account?{' '}
        <Link href="/signup" className="text-purple-700 underline">Sign up here</Link>.
      </p>

      <Link href="/" className="mt-4 inline-block text-sm text-purple-700 underline">
        ← Back to Home
      </Link>
    </div>
  );
}
