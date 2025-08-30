"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Start" },
  { href: "/books", label: "Books" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold hover:text-[1.15rem]">
          Reading <span className="text-blue-600">List</span>
        </Link>
        <ul className="flex items-center gap-4">
          {nav.map((item) => {
            const active = item.href === pathname;
            return(<li key={item.href}>
                 <Link href={item.href} className={`px-3 py-1 text-sm transition hover:bg-blue-600 hover:text-white rounded ${active ? "bg-blue-500 text-white" : ""}`}>{item.label}</Link>
            </li>)
           
          })}
        </ul>
      </nav>
    </header>
  );
}
