import Image from "next/image";
import Link from "next/link";
import connectMongoDB from "../../config/mongodb";

export default function Home() {
  
  connectMongoDB()

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 px-4 sm:px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-2xl flex flex-col items-center text-center space-y-6">
        <Image
          src="/logo.png"
          alt="LoFiLive Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          <span className="block text-black">Welcome to</span>
          <span className="block text-purple-600">LoFiLive</span>
        </h1>
        <p className="text-gray-700 text-sm sm:text-base">
          Your go-to app for discovering local shows & artists.
        </p>
        <Link href="/concerts">
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
}
