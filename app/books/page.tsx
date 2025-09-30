"use client";
import BookCard from "@/components/BookCard";
import { MOCK_BOOKS } from "@/mock/mock-books";

export default function BooksPage() {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Twoje książki</h2>
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 cursor-pointer"
          aria-label="Dodaj książkę"
        >
          + Dodaj
        </button>
      </header>

      <div className="rounded-lg border bg-white p-4">
        {MOCK_BOOKS.length === 0 ? (
          <p className="text-sm text-gray-500">
            Brak danych — dodaj pierwszą książkę.
          </p>
        ) : (
          <ul>
            {MOCK_BOOKS.map((book) => (
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
