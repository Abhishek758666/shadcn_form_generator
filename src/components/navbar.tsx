"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Zod Form Builder
        </Link>
        <nav className="flex items-center gap-2">
          <Button
            variant={pathname === "/docs" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href="/docs" className="gap-2">
              <Book className="h-4 w-4" />
              <span>Docs</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/demo" className="gap-2">
              View Demo
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
