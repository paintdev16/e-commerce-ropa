import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-[75vh] place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">404 / PÁGINA NO ENCONTRADA</p>
        <h1 className="mt-4 text-5xl tracking-tight">Un pequeño desvío.</h1>
        <p className="mt-3 text-sm text-[#777770]">
          La página que buscas no existe o cambió de lugar.
        </p>
        <Link
          href="/"
          className="mt-7 inline-block border-b border-black pb-2 text-xs font-semibold"
        >
          VOLVER AL INICIO ↗
        </Link>
      </div>
    </main>
  );
}
