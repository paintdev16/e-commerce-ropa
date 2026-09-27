import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import CatalogPage, { type CatalogSearchParams } from "@/src/components/products/catalog-page";
export default function ProductsPage({ searchParams }: { searchParams: CatalogSearchParams }) { return <><Navbar /><CatalogPage title="Todos los productos" description="Piezas esenciales, diseñadas para acompañarte." searchParams={searchParams} /><Footer /></>; }
