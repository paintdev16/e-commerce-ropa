"use client";
import { ShopProvider } from "@/src/store/shop-store";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <ShopProvider>
          {children}
          <Toaster position="top-right" />
        </ShopProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
