"use client";
import { BooksProvider } from "@/state/books";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <BooksProvider>{children}</BooksProvider>;
}
