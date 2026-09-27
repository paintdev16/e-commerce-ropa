import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#24241f] text-white">
      <Link
        href="/nuevos"
        className="flex min-h-8 items-center justify-center gap-2 px-4 text-center text-[9px] font-medium tracking-[.13em] transition-colors hover:bg-black"
      >
        <span>DROP 02 · NUEVA TEMPORADA</span>
        <span className="hidden text-white/50 sm:inline">—</span>
        <span className="hidden sm:inline">ENVÍO GRATIS DESDE S/ 250</span>
        <ArrowUpRight aria-hidden="true" className="size-3" />
      </Link>
    </div>
  );
}
