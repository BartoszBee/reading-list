"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Book, BookStatus } from "@/types/book";



type NewBookInput = {
  title: string;
  author: string;
  tags: string[];
  status: BookStatus;
  rating?: number;
  notes?: string;
};

type BooksContextValue = {
  isReady: boolean; // czy stan wczytany z localStorage
  books: Book[];
  addBook: (input: NewBookInput) => string; // zwraca id nowej książki
  getBookById: (id: string) => Book | undefined;
};

const BooksContext = createContext<BooksContextValue | null>(null);

const LS_KEY = "reading-list:books:v1";

function makeId() {
  return `bk-${Date.now().toString(36)} - ${Math.random()
    .toString(36)
    .slice(2, 6)}}`;
}

export function BooksProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Book[];
        setBooks(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      setBooks([]);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(books));
    } catch {}
  }, [books, isReady]);

  const addBook = useCallback((input: NewBookInput) => {
    const id = makeId();
    const now = Date.now();
    const safeRating = Math.max(0, Math.min(5, Math.round(input.rating ?? 0)));

    const newBook: Book = {
      id,
      title: input.title.trim(),
      author: input.author.trim(),
      tags: input.tags.map((t) => t.trim()).filter(Boolean),
      status: input.status,
      rating: safeRating,
      notes: input.notes?.trim() ?? "",
      createdAt: now,
      updatedAt: now,
    };

    setBooks((prev) => [newBook, ...prev]);
    return id;
  }, []);

  const getBookById = useCallback(
    (id: string) => books.find((b) => b.id === id),
    [books]
  );

  const value = useMemo<BooksContextValue>(
    () => ({
      isReady,
      books,
      addBook,
      getBookById,
    }),
    [isReady, books, addBook, getBookById]
  );

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
}

export function useBooks() {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error("useBooks must be used within <BooksProvider>");
  return ctx;
}
