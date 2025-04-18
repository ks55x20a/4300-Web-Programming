'use client';

import { getSession } from "next-auth/react";
import Link from "next/link";

const session = await getSession();
// once we impement the sign up/login function & auth is implemented, this will change dynamically
export default function AccountPage() {
  return (
    <div className="min-h-screen pl-[100px] py-10 px-6 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-black">
      <h1 className="text-3xl font-bold mb-6">Account</h1>

      <div className="bg-white rounded-xl p-6 shadow max-w-md space-y-4">
        <div>
          <p className="font-semibold">Name:</p>
          <p>{session?.user?.name}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{session?.user?.email}</p>
        </div>

        <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
          Edit Info (coming soon)
        </button>
      </div>

      <Link href="/" className="mt-6 inline-block text-sm text-purple-700 underline">
        ← Back to Home
      </Link>
    </div>
  );
}


