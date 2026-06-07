"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

const QUESTIONS: Record<string, string[]> = {
  "holistic-integrative": [
    "How often do you feel emotionally overwhelmed?",
    "Do you struggle with sleep or fatigue?",
    "How would you rate your stress levels?",
    "Do you experience anxiety frequently?",
    "How connected do you feel to your purpose?"
  ],

  "clinical-psychology": [
    "Do you experience prolonged sadness?",
    "Do you struggle with concentration?",
    "Have you lost interest in activities you once enjoyed?",
    "How often do you feel emotionally drained?",
    "Do you feel socially withdrawn?"
  ],

  "coaching-development": [
    "Do you feel stuck in life or career?",
    "How confident are you in decision making?",
    "Do you struggle with goal setting?",
    "How motivated do you feel daily?",
    "Do you need accountability support?"
  ]
};

export default function AssessmentPage() {
  const params = useParams();
  const pathway = params.pathway as string;

  const questions = QUESTIONS[pathway] || [];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: ""
  });

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAnswerChange = (
    question: string,
    value: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      ...formData,
      pathway,
      responses: answers
    };

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <main className="min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-4">
          Assessment Submitted
        </h1>

        <p>
          Thank you for completing your assessment.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 capitalize">
          {pathway.replace(/-/g, " ")} Assessment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              required
              className="w-full border p-3 rounded"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              required
              className="w-full border p-3 rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="text"
              required
              className="w-full border p-3 rounded"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value
                })
              }
            />
          </div>

          <hr className="my-8" />

          {questions.map((question, index) => (
            <div key={index}>
              <label className="block mb-3 font-medium">
                {question}
              </label>

              <select
                required
                className="w-full border p-3 rounded"
                onChange={(e) =>
                  handleAnswerChange(
                    question,
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select an answer
                </option>

                <option value="1">
                  Never
                </option>

                <option value="2">
                  Rarely
                </option>

                <option value="3">
                  Sometimes
                </option>

                <option value="4">
                  Often
                </option>

                <option value="5">
                  Very Often
                </option>
              </select>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded"
          >
            {loading
              ? "Submitting..."
              : "Submit Assessment"}
          </button>
        </form>
      </div>
    </main>
  );
}
