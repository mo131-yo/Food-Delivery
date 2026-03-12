"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-13.75 h-7.5" />;

  const isDark = theme === "dark";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative inline-block w-13.75 h-7.5">
        <input
          type="checkbox"
          id="switch"
          className="sr-only" 
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
        />
        <label
          htmlFor="switch"
          className={`
            block w-full h-full cursor-pointer rounded-full 
            transition-colors duration-1000
            ${isDark ? "bg-yellow-500" : "bg-red-500"}
          `}
        >
          <span
            className={`
              absolute top-1.25 left-1 w-5 h-5 bg-white rounded-full
              shadow-lg
                transition-all duration-800 
              ${isDark ? "translate-x-[27px]" : "translate-x-0"}
            `}
          />
        </label>
      </div>
    </div>
  );
};