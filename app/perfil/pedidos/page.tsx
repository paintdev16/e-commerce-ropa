import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import orders from "@/src/data/orders.json";
import products from "@/src/data/products.json";
import type { Order, Product } from "@/src/types/store";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
export default function OrdersPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[55vh] max-w-[1050px] px-5 py-14 md:px-10">
        <p className="eyebrow">TU CUENTA</p>
          <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/perfil">Mi cuenta</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbPage>Pedidos</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <h1 className="mt-3 text-4xl tracking-[-.05em]">
          Historial de pedidos.
        </h1>
        <div className="mt-8 divide-y divide-black/10">
          {(orders as Order[]).map((order) => (
            <article key={order.id} className="py-6">
              <div className="flex flex-wrap justify-between gap-3">
                <strong>{order.id}</strong>
                <span className="text-sm text-[#777770]">{order.date}</span>
                <Badge variant="secondary" className="rounded-none">{order.status}</Badge>
                <strong>S/ {order.total.toFixed(2)}</strong>
              </div>
              <p className="mt-3 text-sm text-[#777770]">
                {order.productIds
                  .map(
                    (id) =>
                      (products as Product[]).find((p) => p.id === id)?.name,
                  )
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
