import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Reading List",
  description:
    "Śledź książki, które chcesz przeczytać, jesteś w trakcie czytania lub zakończyłeś czytać",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
