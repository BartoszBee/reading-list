"use client";
import { useState } from "react";
import BookCard from "@/components/BookCard";
import BookForm from "@/components/BookForm";
import { useBooks } from "@/state/books";

export default function BooksPage() {
  const { isReady, books } = useBooks();
  const [adding, setAdding] = useState(false);

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Twoje książki</h2>
        <button
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          aria-label="Dodaj książkę"
          onClick={() => setAdding(true)}
        >
          + Dodaj
        </button>
      </header>

      {/* „Modal” w prostym stylu – kontrolowany przez state */}
      {adding && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4"
        >
          <div className="w-full max-w-lg rounded-lg border bg-white p-4 shadow-lg">
            <h3 className="mb-3 text-lg font-semibold">Dodaj książkę</h3>
            <BookForm
              onAdded={() => setAdding(false)}
              onCancel={() => setAdding(false)}
            />
          </div>
        </div>
      )}

      <div className="rounded-lg border bg-white p-4">
        {!isReady ? (
          <p className="text-sm text-gray-500">Wczytywanie…</p>
        ) : books.length === 0 ? (
          <p className="text-sm text-gray-500">Brak danych — dodaj pierwszą książkę.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <li key={book.id}>
                <BookCard book={book} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
