import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import { ProductGrid } from "@/src/components/products/product-card";
import ProductDetail from "@/src/components/products/product-detail";
import { getProductBySlug, getProducts } from "@/src/services/products.service";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export function generateStaticParams() {
  return getProducts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { title: `${product.name} | NÓRD`, description: product.shortDescription, images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getProducts().filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-5 pt-8 md:px-10 md:pt-12">
        <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink render={<Link href="/"/>}>Inicio</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbLink render={<Link href="/productos"/>}>Tienda</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbPage>{product.name}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
        <ProductDetail product={product} />
        <section className="mt-20 grid gap-10 border-t border-black/10 py-12 md:grid-cols-2">
          <div><p className="eyebrow">DETALLES</p><h2 className="mt-3 text-2xl tracking-tight">Hecho para acompañarte.</h2><p className="mt-4 max-w-lg text-sm leading-7 text-[#72726b]">{product.description} Cada detalle responde a una idea simple: hacer mejor lo que usas todos los días.</p></div>
          <div><p className="eyebrow">INFORMACIÓN</p><p className="mt-4 text-sm leading-7 text-[#72726b]">Materiales seleccionados · Diseño versátil · Garantía de calidad NÓRD. Envíos a todo el Perú.</p></div>
        </section>
        {related.length > 0 && <section className="pb-10"><div className="mb-8"><p className="eyebrow">TAMBIÉN TE PUEDE GUSTAR</p><h2 className="section-heading">Completa tu selección.</h2></div><ProductGrid products={related}/></section>}
      </main>
      <Footer />
    </>
  );
}
