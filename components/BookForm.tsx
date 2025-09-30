"use client";

import { useState } from "react";
import { useBooks } from "@/state/books";
import type { BookStatus } from "@/types/book";

type Props = {
  onAdded?: (bookId: string) => void; // np. do zamknięcia modala lub przejścia do szczegółów
  onCancel?: () => void;
};

const STATUSES: BookStatus[] = ["to-read", "reading", "finished"];

export default function BookForm({ onAdded, onCancel }: Props) {
  const { addBook } = useBooks();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tagsRaw, setTagsRaw] = useState(""); // np. "programming, habits"
  const [status, setStatus] = useState<BookStatus>("to-read");
  const [rating, setRating] = useState<number>(0);
  const [notes, setNotes] = useState("");

  const [error, setError] = useState<string | null>(null);
  const canSubmit = title.trim().length > 0 && author.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Tytuł i autor są wymagane.");
      return;
    }

    const tags = tagsRaw
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    const id = addBook({ title, author, tags, status, rating, notes });

    // wyczyść formularz
    setTitle(""); setAuthor(""); setTagsRaw(""); setStatus("to-read"); setRating(0); setNotes("");

    onAdded?.(id);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formularz dodawania książki">
      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="grid gap-2">
        <label htmlFor="f-title" className="text-sm font-medium">Tytuł *</label>
        <input
          id="f-title"
          aria-label="Tytuł"
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="f-author" className="text-sm font-medium">Autor *</label>
        <input
          id="f-author"
          aria-label="Autor"
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="f-tags" className="text-sm font-medium">Tagi (po przecinku)</label>
        <input
          id="f-tags"
          aria-label="Tagi"
          placeholder="np. programming, habits"
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={tagsRaw}
          onChange={e => setTagsRaw(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="f-status" className="text-sm font-medium">Status</label>
        <select
          id="f-status"
          aria-label="Status"
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={e => setStatus(e.target.value as BookStatus)}
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>
              {s === "to-read" ? "Do przeczytania" : s === "reading" ? "Czytam" : "Skończona"}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="f-rating" className="text-sm font-medium">Ocena (0–5)</label>
        <input
          id="f-rating"
          aria-label="Ocena"
          type="number"
          min={0}
          max={5}
          step={1}
          className="w-24 rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="f-notes" className="text-sm font-medium">Notatki</label>
        <textarea
          id="f-notes"
          aria-label="Notatki"
          className="min-h-[80px] resize-y rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 cursor-pointer py-2 text-sm text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!canSubmit}
        >
          Zapisz
        </button>
        <button
          type="button"
          className="rounded border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
          onClick={onCancel}
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}
