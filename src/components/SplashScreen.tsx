"use client";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-600 z-[9999]">
      <div className="text-center text-white animate-pulse">
        <h1 className="text-7xl font-bold tracking-widest">FS</h1>
        <p className="mt-2 text-lg opacity-80">BMI App</p>
      </div>
    </div>
  );
}
