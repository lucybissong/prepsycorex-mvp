import { prisma } from "../../lib/prisma";

export default async function AdminPage() {
  const submissions = await prisma.submission.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        PrePsycorex Admin Dashboard
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="border border-gray-700 p-3 text-left">Name</th>
              <th className="border border-gray-700 p-3 text-left">Email</th>
              <th className="border border-gray-700 p-3 text-left">Phone</th>
              <th className="border border-gray-700 p-3 text-left">Pathway</th>
              <th className="border border-gray-700 p-3 text-left">Status</th>
              <th className="border border-gray-700 p-3 text-left">Created</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="border border-gray-700 p-3">
                  {submission.fullName}
                </td>

                <td className="border border-gray-700 p-3">
                  {submission.email}
                </td>

                <td className="border border-gray-700 p-3">
                  {submission.phone}
                </td>

                <td className="border border-gray-700 p-3">
                  {submission.pathway}
                </td>

                <td className="border border-gray-700 p-3">
                  {submission.status}
                </td>

                <td className="border border-gray-700 p-3">
                  {new Date(submission.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
