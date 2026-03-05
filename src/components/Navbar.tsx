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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-500">
              FS
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">
              Home
            </Link>
            {token && (
              <>
                <Link href="/bmi" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                  BMI
                </Link>
                <Link href="/quotes" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                  Quotes
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            {token ? (
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition font-medium">
                  Login
                </Link>
                <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition font-medium">
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button placeholder */}
        </div>
      </div>
    </nav>
  );
}
