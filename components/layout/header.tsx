"use client";

import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img 
            src="/logo.png" 
            alt="Markdown2HTML" 
            className="h-8 w-auto"
          />
        </div>
        <DarkModeToggle />
      </div>
    </header>
  );
}