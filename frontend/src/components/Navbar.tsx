"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import type { User } from "@/lib/types";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/dashboard", label: "Dashboard" }
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, [pathname]);

  function logout() {
    authService.clearSession();
    setUser(null);
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-forest-500/10 bg-surface/90 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="HireFlow home">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br from-forest-700 to-amber-500 text-white shadow-soft">
            <Icon name="briefcase" className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-normal text-ink">HireFlow</span>
        </Link>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-forest-500/15 text-slate-700 md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <span className="text-xl">{isOpen ? "x" : "="}</span>
        </button>

        <nav
          className={`absolute left-0 right-0 top-16 border-b border-forest-500/10 bg-surface px-4 py-4 md:static md:block md:border-0 md:bg-transparent md:p-0 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition ${
                    isActive ? "text-forest-700" : "text-slate-600 hover:text-ink"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            {user ? (
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <span className="text-sm text-slate-500">Hi, {user.name}</span>
                <Button variant="secondary" onClick={logout} className="h-10 px-4">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 md:flex-row">
                <Link href="/login" className="text-sm font-semibold text-slate-700">
                  Login
                </Link>
                <Link href="/register" className="text-sm font-semibold text-forest-700">
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}
