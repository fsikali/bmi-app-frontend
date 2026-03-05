"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // redirect to login if not logged in
    } else {
      setHydrated(true);
    }
  }, [router]);

  if (!hydrated) return null; // wait for client
  return <>{children}</>;
}
