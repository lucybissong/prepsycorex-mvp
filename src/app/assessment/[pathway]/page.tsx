import React from "react";

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ pathway: string }>;
}) {
  const { pathway } = await params;

  return (
    <main className="min-h-screen bg-[#050816] text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          {pathway.replaceAll("-", " ")}
        </h1>

        <form className="space-y-6 bg-[#111827] p-8 rounded-2xl border border-gray-800">
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              className="w-full p-4 rounded-xl bg-black border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              className="w-full p-4 rounded-xl bg-black border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Phone Number
            </label>

            <input
              type="text"
              className="w-full p-4 rounded-xl bg-black border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              What are you currently struggling with?
            </label>

            <textarea
              rows={6}
              className="w-full p-4 rounded-xl bg-black border border-gray-700"
            />
          </div>

          <button
            type="submit"
            className="bg-white text-black px-6 py-4 rounded-xl font-semibold"
          >
            Submit Assessment
          </button>
        </form>
      </div>
    </main>
  );
}
