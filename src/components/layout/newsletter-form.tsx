"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
    toast.success("Te avisaremos del próximo drop.");
  }

  if (subscribed) {
    return (
      <p role="status" className="mt-5 flex items-center gap-2 border-b border-white/35 pb-3 text-sm text-white/80">
        <Check aria-hidden="true" className="size-4 text-[#d2785b]" />
        Listo. Te avisaremos del próximo drop.
      </p>
    );
  }

  return (
    <form className="mt-5 flex border-b border-white/35 pb-2" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" className="sr-only">Correo electrónico</label>
      <Input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="Tu correo electrónico"
        className="h-9 min-w-0 flex-1 rounded-none border-0 bg-transparent text-sm text-white shadow-none outline-none placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-white/60"
      />
      <Button type="submit" variant="ghost" size="icon" aria-label="Suscribirse al boletín" className="size-8 text-white transition-colors hover:bg-transparent hover:text-[#d2785b]">
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </Button>
    </form>
  );
}
