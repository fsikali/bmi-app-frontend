"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  // Only runs on client
  useEffect(() => {
    setToken(localStorage.getItem("token") || null);
  }, []);

  if (token === undefined) return null; // wait for token

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link href="/">Home</Link>
        {token && (
          <>
            <Link href="/bmi">BMI</Link>
            <Link href="/quotes">Quotes</Link>
          </>
        )}
      </div>
      <div>
        {token ? (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="mr-2">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
