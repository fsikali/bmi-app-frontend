"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // show loading while checking token

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // redirect if not logged in
    } else {
      setLoading(false); // allow content to render
    }
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  return <>{children}</>;
}
