'use client';

import Link from "next/link";
import { useState } from "react";

// can be edited to add more info if we want
export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    // will send to backend or create user
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFormData({ name: '', username: '', email: '', password: '' });
    } catch (error) {
      console.error('Error in Signup!', error);
    }
  };

  return (
    <div className="min-h-screen pl-[100px] py-10 px-6 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-black">
      <h1 className="text-3xl font-bold mb-6">Create a LoFiLive Account</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-300 shadow-sm"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-300 shadow-sm"
        />

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
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-purple-700 underline">Login here</Link>.
      </p>

      <Link href="/" className="mt-4 inline-block text-sm text-purple-700 underline">
        ← Back to Home
      </Link>
    </div>
  );
}