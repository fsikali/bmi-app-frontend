"use client";

import { useState, useEffect } from "react";

export default function BMIForm() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
}, []); 


  const calculate = async () => {
    if (!token) { setError("You must be logged in"); return; }

    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bmi`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ weight: parseFloat(weight), height: parseFloat(height) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setBmi(data.bmi);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">BMI Calculator</h1>
      <input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} className="border p-2 w-full mb-2 rounded" />
      <input type="number" placeholder="Height (m)" value={height} onChange={e => setHeight(e.target.value)} className="border p-2 w-full mb-2 rounded" />
      <button onClick={calculate} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Calculate</button>
      {bmi !== null && <p className="mt-4 font-semibold">Your BMI is: {bmi}</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
