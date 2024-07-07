"use client";

import PhMoonFill from "@/components/icons/moon";
import PhSunBold from "@/components/icons/sun";
import { Button } from "antd";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemedButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Button
      type="text"
      aria-label="change Theme"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <PhMoonFill /> : <PhSunBold />}
    </Button>
  );
}
