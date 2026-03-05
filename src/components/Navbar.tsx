"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    setToken(localStorage.getItem("token") || null);
  }, []);

  if (token === undefined) return null; // wait for token

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">
          FS App
        </div>
        <div className="flex space-x-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          {token && (
            <>
              <Link href="/bmi" className="text-gray-700 hover:text-blue-600 transition">
                BMI
              </Link>
              <Link href="/quotes" className="text-gray-700 hover:text-blue-600 transition">
                Quotes
              </Link>
            </>
          )}
          {token ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
                Login
              </Link>
              <Link href="/signup" className="text-gray-700 hover:text-blue-600 transition">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
