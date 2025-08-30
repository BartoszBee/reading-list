"use client";

import Link from "next/link";
import type { Book } from "@/types/book";

function StatusBadge({ status }: { status: Book["status"] }) {
  const map: Record<Book["status"], string> = {
    "to-read": "Do przeczytania",
    reading: "Czytam",
    finished: "Skończona",
  };
  const color: Record<Book["status"], string> = {
    "to-read": "bg-yellow-100 text-yellow-800 border-yellow-200",
    reading: "bg-blue-100 text-blue-800 border-blue-200",
    finished: "bg-green-100 text-green-800 border-green-200",
  };
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-xs ${color[status]}`}
      aria-label={`Status: ${map[status]}`}
    >
      {map[status]}
    </span>
  );
}

function Rating({ value = 0 }: { value?: number }) {
  // prosta wizualizacja 0–5 (★ = wypełniona, ☆ = pusta)
  const full = Math.max(0, Math.min(5, Math.round(value || 0)));
  const stars = "★★★★★".slice(0, full).padEnd(5, "☆");
  return (
    <span className="text-sm" aria-label={`Ocena: ${full} na 5`}>
      {stars}
    </span>
  );
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <article
      className="group rounded-lg border bg-white p-4 transition hover:shadow-sm"
      aria-labelledby={`book-${book.id}-title`}
    >
      <header className="flex items-start justify-between gap-3">
        <h3 id={`book-${book.id}-title`} className="text-lg font-semibold">
          <Link
            href={`/books/${book.id}`}
            className="underline-offset-2 hover:underline"
            aria-label={`Zobacz szczegóły: ${book.title} autora ${book.author}`}
          >
            &quot;{book.title}&quot;
          </Link>
        </h3>
        <StatusBadge status={book.status} />
      </header>

      <p className="mt-1 text-sm text-gray-600 text-center">
        Autor: <span className="font-medium">{book.author}</span>
      </p>

      <div className="mt-2 flex flex-col items-center gap-2">
        <Rating value={book.rating} />

        <ul className="flex flex-wrap gap-1" aria-label="Tagi">
          {book.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      {book.notes ? (
        <p className="mt-3 line-clamp-2 text-sm text-gray-700 text-center">{book.notes}</p>
      ) : null}

      <footer className="mt-3 text-xs text-gray-500 text-center">
        Dodano: {new Date(book.createdAt).toLocaleDateString()}
      </footer>
    </article>
  );
}
