"use client";

import { useState, useEffect } from "react";

export default function BMIForm() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const calculate = async () => {
    if (!token) {
      setError("You must be logged in");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bmi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ weight: parseFloat(weight), height: parseFloat(height) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setBmi(data.bmi);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">BMI Calculator</h1>
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="number"
        placeholder="Height (m)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <button
        onClick={calculate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Calculating..." : "Calculate"}
      </button>
      {bmi !== null && <p className="mt-4 font-semibold">Your BMI is: {bmi}</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}

