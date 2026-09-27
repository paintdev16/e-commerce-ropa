"use client";

import { Monitor, Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = [
  { value: "light", label: "Claro", Icon: Sun },
  { value: "dark", label: "Oscuro", Icon: Moon },
  { value: "system", label: "Sistema", Icon: Monitor },
] as const;

export default function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant={mobile ? "outline" : "ghost"}
            size={mobile ? "default" : "icon"}
            aria-label="Cambiar tema"
            className={mobile ? "h-11 w-full justify-between rounded-none px-3 text-xs" : "rounded-full"}
          />
        }
      >
        {mobile ? <><span>Apariencia</span><SunMoon aria-hidden="true" className="size-4" /></> : <SunMoon aria-hidden="true" className="size-[19px]" strokeWidth={1.6} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={mobile ? "start" : "end"} className="min-w-40">
        <DropdownMenuRadioGroup value={theme ?? "system"} onValueChange={(value) => setTheme(value)}>
          <DropdownMenuLabel className="px-2">Tema</DropdownMenuLabel>
          {options.map(({ value, label, Icon }) => (
            <DropdownMenuRadioItem key={value} value={value} className="gap-2 pl-2">
              <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
