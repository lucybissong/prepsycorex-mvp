"use client";

import { useState } from "react";
import { questions } from "../../../lib/questions";

type Props = {
  params: {
    pathway: string;
  };
};

export default function AssessmentPage({ params }: Props) {
  const pathwayQuestions =
    questions[params.pathway as keyof typeof questions] || [];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerChange = (
    question: string,
    value: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const payload = {
      ...formData,
      pathway: params.pathway,
      responses: answers,
    };

    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("Assessment submitted successfully");
    } else {
      alert("Submission failed");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 capitalize">
          {params.pathway.replace(/-/g, " ")} Assessment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 rounded bg-zinc-900 border border-zinc-700"
            onChange={(e) =>
              setFormData({
                ...formData,
                fullName: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded bg-zinc-900 border border-zinc-700"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-4 rounded bg-zinc-900 border border-zinc-700"
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
          />

          {pathwayQuestions.map((question, index) => (
            <div key={index}>
              <label className="block mb-2 text-lg">
                {question}
              </label>

              <textarea
                className="w-full p-4 rounded bg-zinc-900 border border-zinc-700 min-h-[120px]"
                onChange={(e) =>
                  handleAnswerChange(
                    question,
                    e.target.value
                  )
                }
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-white text-black px-6 py-4 rounded font-semibold"
          >
            Submit Assessment
          </button>
        </form>
      </div>
    </main>
  );
}
