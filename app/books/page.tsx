export default function BooksPage() {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Twoje książki</h2>
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          aria-label="Dodaj książkę"
        >
          + Dodaj
        </button>
      </header>

      <div className="rounded-lg border bg-white p-4">
        {/* Jutro: tu wstawimy listę BookCard i panel filtrów */}
        <p className="text-sm text-gray-500">
          Brak danych — dodaj pierwszą książkę.
        </p>
      </div>
    </section>
  );
}
