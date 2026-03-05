"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import QuotesList from "@/components/QuotesList";

export default function QuotesPage() {
  return (
    <ProtectedRoute>
      <QuotesList />
    </ProtectedRoute>
  );
}

