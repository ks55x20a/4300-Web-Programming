import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const isLoggedIn = true; // just for testing, will change later for actual auth

  return (
    <nav className="fixed left-0 top-0 h-full w-[80px] bg-white border-r shadow-md flex flex-col justify-between items-center py-6 z-50">
      {/* nav links */}
      <div className="flex flex-col items-center space-y-8 flex-1 justify-center">
        {/* home */}
        <Link href="/concerts">
          <div className="w-16 grid place-items-center text-center">
            <Image src="/shows.png" alt="Home" width={24} height={22} />
            <span className="text-[10px] text-gray-600 font-semibold leading-tight mt-1">
              Shows
            </span>
          </div>
        </Link>

        {/* saved playlists */}
        <Link href={isLoggedIn ? "/dashboard" : "/login"}>
          <div className="w-16 grid place-items-center text-center">
            <Image src="/saved.png" alt="Saved" width={24} height={24} />
            <span className="text-[10px] text-gray-600 font-semibold leading-tight mt-1">
              Saved<br />Playlists
            </span>
          </div>
        </Link>

        {/* account */}
        <Link href={isLoggedIn ? "/account" : "/login"}>
          <div className="w-16 grid place-items-center text-center">
            <Image src="/account.png" alt="Account" width={24} height={24} />
            <span className="text-[10px] text-gray-600 font-semibold leading-tight mt-1">
              Account
            </span>
          </div>
        </Link>

        {/* sign up / login */}
        {!isLoggedIn && (
          <Link href="/login">
            <div className="w-16 grid place-items-center text-center">
              <Image src="/login.png" alt="Login" width={28} height={28} />
              <span className="text-[10px] text-gray-600 font-semibold leading-tight mt-1">
                Login/<br />Sign Up
              </span>
            </div>
          </Link>
        )}
      </div>

      {/* bottom logo */}
      <Link href="/" className="mb-4">
        <Image src="/logo.png" alt="LoFiLive logo" width={45} height={45} />
      </Link>
    </nav>
  );
}
