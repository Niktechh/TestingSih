"use client";

import { Toaster } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { Toaster as Sonner } from "@/Components/ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { I18nProvider } from "@/lib/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
