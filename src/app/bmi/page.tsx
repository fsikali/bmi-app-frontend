"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import BMIForm from "@/components/BMIForm";

export default function BMIPage() {
  return (
    <ProtectedRoute>
      <BMIForm />
    </ProtectedRoute>
  );
}
