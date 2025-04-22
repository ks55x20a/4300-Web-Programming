'use client'

import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { doLogout } from "@/app/actions";

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  // const isLoggedIn = true; // just for testing, will change later for actual auth
  const [isLoggedIn, setIsLoggedIn] = useState(!!session?.user);

  useEffect(() => {
    setIsLoggedIn(!!session?.user);
  }, [session]);

  const handleLogout = () => {
    doLogout();
    setIsLoggedIn(!!session?.user);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="LoFiLive logo" width={40} height={40} />
        </Link>

        {/* nav links */}
        <div className="flex items-center space-x-10">
          {/* home */}
          <Link href="/concerts">
            <div className="grid place-items-center text-center">
              <Image src="/shows.png" alt="Home" width={24} height={24} />
              <span className="text-[10px] text-gray-700 font-semibold leading-tight mt-1">
                Shows
              </span>
            </div>
          </Link>

          {/* saved playlists */}
          <Link href={isLoggedIn ? "/dashboard" : "/login"}>
            <div className="grid place-items-center text-center">
              <Image src="/saved.png" alt="Saved" width={24} height={24} />
              <span className="text-[10px] text-gray-700 font-semibold leading-tight mt-1">
                Saved<br />Playlists
              </span>
            </div>
          </Link>

          {/* account */}
          <Link href={isLoggedIn ? "/account" : "/login"}>
            <div className="grid place-items-center text-center">
              <Image src="/account.png" alt="Account" width={24} height={24} />
              <span className="text-[10px] text-gray-700 font-semibold leading-tight mt-1">
                Account
              </span>
            </div>
          </Link>

          {/* sign up / login */}
          {!isLoggedIn && (
            <Link href="/login">
              <div className="grid place-items-center text-center">
                <Image src="/login.png" alt="Login" width={28} height={28} />
                <span className="text-[10px] text-gray-700 font-semibold leading-tight mt-1">
                  Login/<br />Sign Up
                </span>
              </div>
            </Link>
          )}

          {/* logout */}
          {isLoggedIn && (
            <div
              className="grid place-items-center text-center cursor-pointer"
              onClick={handleLogout}
            >
              <Image src="/login.png" alt="Logout" width={28} height={28} />
              <span className="text-[10px] text-gray-700 font-semibold leading-tight mt-1">
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
