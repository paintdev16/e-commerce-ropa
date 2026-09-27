"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function DemoForm({ register = false }: { register?: boolean }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    toast.success(register ? "Cuenta de demostración creada." : "Sesión de demostración iniciada.");
  }
  return (
    <main className="mx-auto grid min-h-[65vh] max-w-[520px] place-items-center px-5 py-14">
      <form onSubmit={submit} className="w-full border border-border p-7 md:p-10">
        <p className="eyebrow">NÓRD STUDIO / CUENTA</p>
        <h1 className="mt-3 text-3xl tracking-tight">{register ? "Crea tu cuenta." : "Qué bueno verte."}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Interfaz de demostración, sin autenticación real.</p>
        {sent && <Badge variant="secondary" role="status" className="mt-5 h-auto rounded-none px-3 py-2 text-xs">Formulario de muestra enviado correctamente.</Badge>}
        <div className="mt-7 grid gap-4">
          {register && <label className="grid gap-2 text-xs">Nombre completo<Input required name="name" autoComplete="name" minLength={2} placeholder="Nombre y apellidos" className="h-11 rounded-none"/></label>}
          <label className="grid gap-2 text-xs">Correo electrónico<Input required name="email" type="email" autoComplete="email" placeholder="nombre@correo.com" className="h-11 rounded-none"/></label>
          <label className="grid gap-2 text-xs">Contraseña<Input required name="password" type="password" autoComplete={register ? "new-password" : "current-password"} minLength={6} placeholder="Mínimo 6 caracteres" className="h-11 rounded-none"/></label>
          {register && <label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"><Checkbox required className="mt-0.5"/><span>Acepto las condiciones de uso de esta demostración.</span></label>}
          <Button type="submit" className="mt-2 h-12 rounded-none text-xs font-semibold tracking-wider">{register ? "CREAR CUENTA" : "INICIAR SESIÓN"}</Button>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">{register ? "¿Ya tienes cuenta? " : "¿Eres nuevo en NÓRD? "}<Link className="underline underline-offset-4" href={register ? "/login" : "/register"}>{register ? "Inicia sesión" : "Crea tu cuenta"}</Link></p>
      </form>
    </main>
  );
}
