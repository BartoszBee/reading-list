import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-5 text-center">
      <h1 className="text-2xl font-bold text-gray-600">
        Twoja lista książek - śledź swoje lektury
      </h1>
      <p className=" text-shadow-zinc-600 italic">
        Dodawaj tytuły, oznaczaj status, oceniaj i zapisuj notatki. Wszystko
        lokalnie w Twojej przeglądarce.
      </p>
      <div>
        <Link
          href="/books"
          className="px-3 py-1 text-sm transition bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Przejdź do listy
        </Link>
      </div>    
    </section>
  );
}
