"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFade(true); // start fade
    }, 1600);

    const removeTimer = setTimeout(() => {
      setVisible(false); // remove completely
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-blue-600 z-[9999] transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center text-white">
        <h1 className="text-7xl font-bold tracking-widest animate-logo">
          FS
        </h1>
        <p className="mt-3 text-lg opacity-90">BMI App</p>
      </div>
    </div>
  );
}
