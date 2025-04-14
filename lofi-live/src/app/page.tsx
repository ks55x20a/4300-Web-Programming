import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 px-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center space-y-6">
        <Image
          src="/logo.png"
          alt="LoFiLive Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
        <h1 className="text-3xl font-bold">Welcome to <span className="text-purple-600">LoFiLive</span></h1>
        <p className="text-gray-700">Your go-to app for discovering local shows & artists.</p>
        <Link href="/concerts">
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
}
