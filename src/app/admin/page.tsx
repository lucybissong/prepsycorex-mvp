import prisma from "../../lib/prisma";

export default async function AdminPage() {
  const submissions = await prisma.submission.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#050816] text-white p-10">
      <h1 className="text-4xl font-bold mb-10">
        Assessment Submissions
      </h1>

      <div className="space-y-6">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6"
          >
            <div className="space-y-2 mb-4">
              <p>
                <strong>Name:</strong>{" "}
                {submission.fullName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {submission.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {submission.phone}
              </p>

              <p>
                <strong>Pathway:</strong>{" "}
                {submission.pathway}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {submission.status}
              </p>

              <p>
                <strong>Submitted:</strong>{" "}
                {new Date(
                  submission.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <div>
              <h2 className="font-bold mb-3">
                Responses
              </h2>

              <pre className="bg-black p-4 rounded-xl overflow-auto text-sm">
                {JSON.stringify(
                  submission.responses,
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
