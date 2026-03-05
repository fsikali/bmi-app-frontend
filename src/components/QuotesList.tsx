"use client";

import { useState, useEffect } from "react";

interface Quote {
  id: number;
  text: string;
  author: string;
}

export default function QuotesList() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quotes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");
        setQuotes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Quotes</h1>

      {loading ? (
        <p className="text-gray-500 italic">Loading quotes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : quotes.length === 0 ? (
        <p>No quotes available.</p>
      ) : (
        quotes.map((q) => (
          <div key={q.id} className="mb-3 border-b pb-2">
            <p className="italic">{q.text}</p>
            <p className="text-right font-semibold">— {q.author}</p>
          </div>
        ))
      )}
    </div>
  );
}
