"use client";

import { useEffect, useState } from "react";

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
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchQuotes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/quotes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to load quotes");

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
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Quotes</h1>

      {loading && <p>Loading quotes...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && quotes.length > 0 &&
        quotes.map((q) => (
          <div key={q.id} className="mb-3 border-b pb-2">
            <p className="italic">{q.text}</p>
            <p className="text-right font-semibold">— {q.author}</p>
          </div>
        ))}

      {!loading && quotes.length === 0 && !error && (
        <p>No quotes available.</p>
      )}
    </div>
  );
}
