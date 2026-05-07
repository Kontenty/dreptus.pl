"use client";

import { Toast } from "@heroui/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export function Providers({ children }: Props) {
  return (
    <>
      <Toast.Provider placement="top" />
      {children}
    </>
  );
}
