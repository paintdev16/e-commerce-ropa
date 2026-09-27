import Link from "next/link";
import { Heart, UserRound } from "lucide-react";
import GlobalSearch from "@/src/components/layout/global-search";
import AnnouncementBar from "@/src/components/layout/announcement-bar";
import CartIndicator from "@/src/components/layout/cart-indicator";
import MobileMenu from "@/src/components/layout/mobile-menu";
import ThemeToggle from "@/src/components/layout/theme-toggle";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const links = [
  { label: "Hombre", href: "/hombre" },
  { label: "Mujer", href: "/mujer" },
  { label: "Calzado", href: "/calzado" },
  { label: "Ropa", href: "/ropa" },
  { label: "Nuevos", href: "/nuevos" },
  { label: "Ofertas", href: "/ofertas", accent: true },
];

export default function Navbar() {
  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-black/[.06] bg-background/95 backdrop-blur-xl supports-backdrop-filter:bg-background/85">
        <div className="mx-auto grid h-[68px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2">
            <MobileMenu />
            <Link
              href="/"
              aria-label="Nórd, inicio"
              className="text-[21px] font-semibold tracking-[.2em] sm:text-[23px]"
            >
              NÓRD<span className="text-[#b4543b]">.</span>
            </Link>
          </div>

          <nav aria-label="Navegación principal" className="hidden lg:flex">
            <NavigationMenu className="max-w-none">
              <NavigationMenuList className="gap-3 xl:gap-5">
                {links.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      render={<Link href={link.href} />}
                      className={`relative rounded-none px-1 py-2 text-[11px] font-medium after:absolute after:inset-x-1 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:bg-transparent hover:after:scale-x-100 ${link.accent ? "text-[#a44732]" : "text-foreground/75 hover:text-foreground"}`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center justify-self-end gap-0.5 sm:gap-1">
            <GlobalSearch />
            <ThemeToggle />
            <Tooltip><TooltipTrigger render={<Link href="/favoritos" aria-label="Ver favoritos" className="hidden size-10 place-items-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 sm:grid" />}><Heart aria-hidden="true" className="size-[19px]" strokeWidth={1.6} /></TooltipTrigger><TooltipContent>Favoritos</TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger render={<Link href="/perfil" aria-label="Mi cuenta" className="hidden size-10 place-items-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 sm:grid" />}><UserRound aria-hidden="true" className="size-[19px]" strokeWidth={1.6} /></TooltipTrigger><TooltipContent>Mi cuenta</TooltipContent></Tooltip>
            <CartIndicator />
          </div>
        </div>
      </header>
    </>
  );
}
