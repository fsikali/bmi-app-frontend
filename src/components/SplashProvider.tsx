"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

export default function SplashProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return <>{children}</>;
}
