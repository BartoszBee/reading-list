import type { Book } from '@/types/book'

export const MOCK_BOOKS: Book[] = [
  {
    id: "bk-1",
    title: "Clean Code",
    author: "Robert C. Martin",
    tags: ["programming", "best-practices"],
    status: "reading",
    rating: 5,
    notes: "Rozdziały o nazwach i funkcjach — złoto.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    updatedAt: Date.now() - 1000 * 60 * 60,
  },
  {
    id: "bk-2",
    title: "Atomic Habits",
    author: "James Clear",
    tags: ["productivity", "habits"],
    status: "to-read",
    rating: 0,
    notes: "",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    updatedAt: Date.now() - 1000 * 60 * 10,
  },
  {
    id: "bk-3",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    tags: ["programming", "craft"],
    status: "finished",
    rating: 4,
    notes: "Dobre, ale wrócę do rozdziału o narzędziach.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
    updatedAt: Date.now() - 1000 * 60 * 60 * 6,
  },
];
