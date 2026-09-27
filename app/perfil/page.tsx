import Link from "next/link";
import { ArrowUpRight, Heart, LogOut, Package } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import users from "@/src/data/users.json";
import orders from "@/src/data/orders.json";
export default function ProfilePage() {
  const user = users[0];
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[55vh] max-w-[1050px] px-5 py-14 md:px-10">
        <p className="eyebrow">TU ESPACIO NÓRD</p>
        <h1 className="mt-3 text-4xl tracking-[-.05em]">
          Hola, {user.name.split(" ")[0]}.
        </h1>
        <section className="mt-9 flex items-center gap-5 border-y border-border py-6">
          <Avatar size="lg" className="size-[72px]"><AvatarImage src={user.avatar} alt={user.name}/><AvatarFallback>{user.name.split(" ").map((part) => part[0]).slice(0,2).join("")}</AvatarFallback></Avatar>
          <div>
            <h2 className="font-medium">{user.name}</h2>
            <p className="mt-1 text-sm text-[#777770]">
              {user.email} · {user.phone}
            </p>
            <p className="mt-1 text-xs text-[#888]">{user.address}</p>
          </div>
        </section>
        <div className="mt-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">TU HISTORIAL</p>
            <h2 className="mt-2 text-2xl">Pedidos recientes</h2>
          </div>
          <Button nativeButton={false} render={<Link href="/perfil/pedidos"/>} variant="link" className="h-auto gap-1 p-0 text-xs">Ver todos <ArrowUpRight className="size-3.5"/></Button>
        </div>
        <div className="mt-5 divide-y divide-border">
          {orders.map((order) => (
            <Link
              key={order.id}
              href="/perfil/pedidos"
              className="flex flex-wrap justify-between gap-3 py-5 text-sm"
            >
              <span className="font-medium">{order.id}</span>
              <span>{order.date}</span>
              <Badge variant="secondary" className="rounded-none">{order.status}</Badge>
              <span>S/ {order.total.toFixed(2)}</span>
            </Link>
          ))}
        </div>
        <Separator className="my-8"/>
        <div className="flex flex-wrap gap-3"><Button nativeButton={false} render={<Link href="/favoritos"/>} variant="outline" className="h-11 rounded-none text-xs"><Heart className="mr-2 size-4"/>MIS FAVORITOS</Button><Button nativeButton={false} render={<Link href="/perfil/pedidos"/>} variant="outline" className="h-11 rounded-none text-xs"><Package className="mr-2 size-4"/>MIS PEDIDOS</Button><Button nativeButton={false} render={<Link href="/login"/>} variant="ghost" className="h-11 rounded-none text-xs"><LogOut className="mr-2 size-4"/>CERRAR SESIÓN</Button></div>
      </main>
      <Footer />
    </>
  );
}
