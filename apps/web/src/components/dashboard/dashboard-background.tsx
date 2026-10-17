"use client";

import { useTheme } from "next-themes";
import { EtherealDust } from "@/components/EtherealDust";
import { useEffect, useState } from "react";

export function DashboardBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return <EtherealDust isLightMode={resolvedTheme === "light"} />;
}
