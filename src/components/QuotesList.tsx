"use client";

import { useState, useEffect } from "react";

interface Quote { id: number; text: string; author: string; }

export default function QuotesList() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => { setToken(localStorage.getItem("token")); }, []);

  useEffect(() => {
    if (!token) return;

    const fetchQuotes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quotes`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");
        setQuotes(data);
      } catch (err: any) { setError(err.message); }
    };

    fetchQuotes();
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Quotes</h1>
      {error && <p className="text-red-500">{error}</p>}
      {quotes.map(q => (
        <div key={q.id} className="mb-3 border-b pb-2">
          <p className="italic">{q.text}</p>
          <p className="text-right font-semibold">— {q.author}</p>
        </div>
      ))}
      {quotes.length === 0 && !error && <p>No quotes available.</p>}
    </div>
  );
}
