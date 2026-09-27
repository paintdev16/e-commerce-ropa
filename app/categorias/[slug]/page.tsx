import { notFound } from "next/navigation";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import CatalogPage, { type CatalogSearchParams } from "@/src/components/products/catalog-page";
import { getCategories } from "@/src/services/categories.service";

export function generateStaticParams() {
  return getCategories().map(({ slug }) => ({ slug }));
}

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: CatalogSearchParams }) {
  const { slug } = await params;
  const category = getCategories().find((item) => item.slug === slug);
  if (!category) notFound();
  return <><Navbar /><CatalogPage title={category.name} description="Una selección pensada para acompañarte." searchParams={searchParams} baseFilters={{ category: category.slug, department: category.department }} showDepartment={false} /><Footer /></>;
}
