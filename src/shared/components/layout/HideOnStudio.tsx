"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function HideOnStudio({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/studio")) {
    return null;
  }
  
  return <>{children}</>;
}
