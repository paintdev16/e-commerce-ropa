import Image from "next/image";
import Link from "next/link";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import { getCategories } from "@/src/services/products.service";
export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[55vh] max-w-[1440px] px-5 py-14 md:px-10">
        <p className="eyebrow">EXPLORA NÓRD</p>
        <h1 className="mt-3 text-4xl tracking-[-.05em] md:text-6xl">
          Colecciones.
        </h1>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {getCategories().map((category, index) => {
            const tones = [
              "#e8e2d9",
              "#dfe2dc",
              "#e6ddd3",
              "#e0e3e4",
              "#eee1d9",
            ];
            return (
              <Link key={category.id} href={`/categorias/${category.slug}`}>
                <div
                  style={{ backgroundColor: tones[index % tones.length] }}
                  className="relative aspect-[.9]"
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="33vw"
                    className="object-contain p-8 transition-transform hover:scale-105"
                  />
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-xs text-[#888]">
                    {category.count} piezas ↗
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
