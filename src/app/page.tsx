"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-indigo-600 mb-4 animate-fadeIn">
        Welcome to FS App
      </h1>
      <p className="text-gray-700 text-lg md:text-xl mb-8 animate-fadeIn delay-150">
        Your personal BMI calculator and motivational quotes all in one place.
      </p>
      <div className="flex space-x-4 justify-center">
        <a
          href="/signup"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition font-semibold"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg shadow-md hover:bg-indigo-50 transition font-semibold"
        >
          Login
        </a>
      </div>
    </div>
  );
}
