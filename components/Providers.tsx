"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export function Providers({ children }: Props) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" toastOffset={50} />
      {children}
    </HeroUIProvider>
  );
}
