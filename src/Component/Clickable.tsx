"use client";

import { useState } from "react";
import React from "react";



export default function ClickableIcon({ children }: { children: React.ReactNode }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);

    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <span
      onClick={handleClick}
      className={`
        inline-block cursor-pointer right-0 left-0 mx-auto
        transition-all duration-600 easy-out
        ${clicked ? "  duration-800 animate-spin-slow " : ""}
      `}
    >
      {children}
    </span>
  );
}
