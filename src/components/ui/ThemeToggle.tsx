/**
 * 🌙 Theme Toggle Component
 * Beautiful animated toggle between light and dark modes
 */

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <div className="w-4 h-4" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full hover:bg-accent/80 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="relative w-4 h-4">
        <Sun 
          className={`w-4 h-4 absolute transition-all duration-300 ease-in-out transform ${
            theme === "dark" 
              ? "scale-0 rotate-90 opacity-0" 
              : "scale-100 rotate-0 opacity-100"
          }`}
        />
        <Moon 
          className={`w-4 h-4 absolute transition-all duration-300 ease-in-out transform ${
            theme === "dark" 
              ? "scale-100 rotate-0 opacity-100" 
              : "scale-0 -rotate-90 opacity-0"
          }`}
        />
      </div>
    </Button>
  );
};