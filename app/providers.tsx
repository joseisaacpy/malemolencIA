"use client";

import * as React from "react";
import { PageTransition } from "@/components/providers/PageTransition";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
      <Toaster theme="dark" />
    </>
  );
}
