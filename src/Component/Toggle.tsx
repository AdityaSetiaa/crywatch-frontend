"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { WiDaySunny } from "react-icons/wi";
import ClickableIcon from "@/Component/Clickable";
import { WiMoonAltFull } from "react-icons/wi";


export default function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // If theme === system → use actual system theme for icon
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
     <ClickableIcon >
<button 
  onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
  className="flex items-center justify-center px-1 py-1"
>
  {currentTheme === "light" 
    ? <WiMoonAltFull className="h-10 w-10 text-black" /> 
    : <WiDaySunny className="h-10 w-10 " />
  }
</button>
     </ClickableIcon>
    
  );
}
