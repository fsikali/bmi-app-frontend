"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { token, setToken } = useAuth();

  const logout = () => {
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex space-x-4 mb-2 sm:mb-0">
        <Link href="/" className="hover:underline">Home</Link>
        {token && (
          <>
            <Link href="/bmi" className="hover:underline">BMI</Link>
            <Link href="/quotes" className="hover:underline">Quotes</Link>
          </>
        )}
      </div>
      <div>
        {token ? (
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="mr-2 hover:underline">Login</Link>
            <Link href="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
