
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Background() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div className='fixed z-2 w-full h-full'>
      <div className={`absolute h-full w-full transition-colors duration-500 ease-in-out bg-size-[3rem_3rem] ${
        isDark 
          ? 'bg-black  bg-[linear-gradient(#252525_0.03px,transparent_1px),linear-gradient(90deg,#252525_0.03px,transparent_1px)] shadow-[inset_100px_100px_100px_rgba(0,0,0,0.6),inset_-100px_-100px_100px_rgba(0,0,0,0.6)]'
          : ' bg-white bg-[linear-gradient(#e5e5e5_0.5px,transparent_1px),linear-gradient(90deg,#e5e5e5_0.5px,transparent_1px)] shadow-[inset_100px_100px_100px_rgba(255,255,255,0.5),inset_-100px_-100px_100px_rgba(0,0,0,0.05)] duration-500'
      }`}> 
        <div className={`absolute top-1/2 left-1/2 h-auto transform -translate-x-[50%] -translate-y-[50%] flex bg-linear-to-tr bg-clip-text text-transparent text-[13vw] leading-[1.2] tracking-normal font-semibold ${
          isDark 
            ? 'from-zinc-950 via-zinc-950 to-zinc-950'
            : ''
        }`}>
          <h1 className={`sama text-6xl opacity-20 ${isDark ? 'text-zinc-400' : ' opacity-25'}`}>
            
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Background;