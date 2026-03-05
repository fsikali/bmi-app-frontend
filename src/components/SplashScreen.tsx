"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-blue-600 flex items-center justify-center z-50">
      <h1 className="text-white text-6xl font-bold">FS</h1>
    </div>
  );
}
