"use client";

import React, { useState } from "react";

export default function AssessmentPage({
  params,
}: {
  params: Promise<{ pathway: string }>;
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const { pathway } = await params;

    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        pathway,
      }),
    });

    const data = await response.json();

    setLoading(false);

    if (data.success) {
      alert("Assessment submitted successfully");
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Assessment Intake
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#111827] p-8 rounded-2xl border border-gray-800"
        >
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Full Name
            </label>

            <input
              required
              type="text"
              value={form.fullName}
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-black border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Email Address
            </label>

            <input
              required
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-black border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Phone Number
            </label>

            <input
              required
              type="text"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-black border border-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black px-6 py-4 rounded-xl font-semibold"
          >
            {loading ? "Submitting..." : "Submit Assessment"}
          </button>
        </form>
      </div>
    </main>
  );
}
