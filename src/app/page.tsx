import React from "react";

const pathways = [
  {
    title: "Purpose & Life Direction",
    description:
      "Identity clarity, life direction, purpose mapping and internal alignment.",
  },
  {
    title: "Relational & Fragmentation",
    description:
      "Relational dynamics, emotional fragmentation and behavioral patterns.",
  },
  {
    title: "Holistic Integrative",
    description:
      "Comprehensive integrative assessment across life systems and cognition.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h1 className="text-5xl font-bold mb-6">
            PRE-PSYCOREX™
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl">
            AI-assisted psychological assessment intake and reporting system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pathways.map((pathway) => (
            <div
              key={pathway.title}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">
                {pathway.title}
              </h2>

              <p className="text-gray-400 mb-8">
                {pathway.description}
              </p>
<a
  href={`/assessment/${pathway.title
    .toLowerCase()
    .replaceAll(" ", "-")}`}
  className="inline-block bg-white text-black px-5 py-3 rounded-xl font-medium"
>
  Start Assessment
</a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
