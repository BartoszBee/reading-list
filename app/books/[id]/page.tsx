import type { Metadata } from "next";

type PageProps = {
  params: { id: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: `Książka #${params.id} - Reading List`,
  };
}

export default function BookDetailsPage({ params }: PageProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Szczegóły książki</h2>
      <p className="text-sm text-gray-600">
        Identyfikator: <span className="font-mono">{params.id}</span>
      </p>

      <div className="rounded-lg border bg-white p-4">
        <p className="text-sm text-gray-700">
         Placeholder dla {params.id}
        </p>
      </div>
    </section>
  );
}
