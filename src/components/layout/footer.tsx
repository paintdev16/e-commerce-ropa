import Link from "next/link";
import NewsletterForm from "@/src/components/layout/newsletter-form";

const footerGroups = [
  { title: "DESCUBRE", links: [["Hombre", "/hombre"], ["Mujer", "/mujer"], ["Calzado", "/calzado"], ["Ropa", "/ropa"]] },
  { title: "NÓRD", links: [["Nuevos lanzamientos", "/nuevos"], ["Ofertas", "/ofertas"], ["Favoritos", "/favoritos"], ["Mi cuenta", "/perfil"]] },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#24241f] text-white sm:mt-28">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[1.3fr_.7fr_.7fr_1.1fr] lg:px-14 lg:py-20">
        <div>
          <Link href="/" className="text-[22px] font-semibold tracking-[.2em]">NÓRD<span className="text-[#d2785b]">.</span></Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">Ropa y calzado para moverte con confianza. Encuentra tu ritmo, crea tu propia ruta.</p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="text-[9px] font-semibold tracking-[.18em] text-white/50">{group.title}</p>
            <nav className="mt-5 grid gap-3">
              {group.links.map(([label, href]) => <Link key={href} href={href} className="w-fit text-sm text-white/75 transition-colors hover:text-white">{label}</Link>)}
            </nav>
          </div>
        ))}

        <div>
          <p className="text-[9px] font-semibold tracking-[.18em] text-white/50">NOTAS DE NÓRD</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">Nuevos lanzamientos, ideas de estilo y próximos drops, directo a tu correo.</p>
          <NewsletterForm />
          <p className="mt-2 text-[9px] text-white/40">Solo novedades seleccionadas. Sin ruido.</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-2 text-[9px] tracking-[.08em] text-white/40 sm:flex-row">
          <p>© 2026 NÓRD STUDIO · HECHO CON INTENCIÓN EN LIMA</p>
          <p>ENVÍOS A TODO EL PERÚ · PRECIOS EN SOLES</p>
        </div>
      </div>
    </footer>
  );
}
