import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Banner } from "@/src/types/store";

export default function EditorialHero({ banner }: { banner: Banner }) {
  return (
    <section className="relative isolate min-h-[650px] overflow-hidden bg-[#d9d7d0] sm:min-h-[700px] lg:min-h-[min(780px,calc(100svh-100px))]">
      <Image
        src={banner.image}
        alt={banner.imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[72%_55%] sm:object-[76%_55%] lg:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#d9d7d0]/90 via-[#d9d7d0]/45 to-transparent lg:from-[#d9d7d0]/85 lg:via-[#d9d7d0]/35" />

      <div className="mx-auto flex min-h-[inherit] max-w-[1600px] flex-col justify-between px-5 pb-8 pt-12 sm:px-8 sm:pb-10 sm:pt-16 lg:px-14 lg:pt-20">
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-medium tracking-[.22em] text-black/55 sm:text-[10px]">
            {banner.eyebrow}
          </p>
          <p className="hidden text-[9px] tracking-[.18em] text-black/45 sm:block">
            {banner.note}
          </p>
        </div>

        <div className="relative z-10 max-w-[680px] pb-28 sm:pb-32 lg:pb-20">
          <p className="mb-4 text-[10px] font-semibold tracking-[.22em] text-[#a44732]">
            {banner.kicker}
          </p>
          <h1 className="max-w-[650px] text-[clamp(3.7rem,11vw,8.8rem)] font-medium leading-[.82] tracking-[-.085em]">
            {banner.title}
            <br />
            <span className="font-normal italic">{banner.emphasis}</span>
          </h1>
          <p className="mt-6 max-w-[330px] text-sm leading-6 text-black/65 sm:mt-8 sm:text-[15px]">
            {banner.description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
            <Button
              nativeButton={false}
              render={<Link href={banner.primaryCta.href} />}
              className="h-12 rounded-none bg-[#24241f] px-5 text-[10px] tracking-[.13em] text-white hover:bg-[#a44732]"
            >
              {banner.primaryCta.label} <ArrowUpRight aria-hidden="true" className="ml-3 size-4" />
            </Button>
            {banner.secondaryCta && (
              <Button
                nativeButton={false}
                render={<Link href={banner.secondaryCta.href} />}
                variant="outline"
                className="h-12 rounded-none border-black/25 bg-transparent px-5 text-[10px] tracking-[.13em] hover:bg-white/45"
              >
                {banner.secondaryCta.label}
              </Button>
            )}
          </div>
        </div>

        <div className="relative z-10 flex items-end justify-between">
          <div className="flex items-center gap-3 text-[9px] tracking-[.16em] text-black/50">
            <span className="grid size-8 place-items-center rounded-full border border-black/25">
              <ArrowDownRight aria-hidden="true" className="size-4" />
            </span>
            DESLIZA PARA DESCUBRIR
          </div>
          <p className="text-[9px] tracking-[.18em] text-black/45">01 — 04</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute bottom-24 right-4 z-0 hidden [writing-mode:vertical-rl] text-[9px] tracking-[.2em] text-black/40 lg:block">
        HECHO PARA MOVERTE
      </div>
    </section>
  );
}
