"use client";

import { useState } from "react";
import Link from "next/link";
import { Code, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/shortener", label: "Url-Shortener" },
  ];

  return (
    <>
      <nav className="w-full fixed top-0 z-50 bg-background/70 backdrop-blur-md border-b border-muted/20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              <Link href="/" className="text-lg font-bold text-primary">
                DSA Hub
              </Link>
            </div>

            <div className="hidden md:flex space-x-6 mr-28">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                className="md:hidden p-2 rounded hover:bg-muted/20 transition"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-background/80 backdrop-blur-md border-t border-muted/20 px-4 py-3 animate-slide-down">
            <div className="flex flex-col space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-primary transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="h-16" />
    </>
  );
}
