import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-forest-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-forest-700 hover:shadow-lift focus-visible:ring-forest-500",
  secondary:
    "border border-forest-500/20 bg-surface text-ink hover:-translate-y-0.5 hover:border-forest-500/40 hover:bg-forest-50 focus-visible:ring-forest-500",
  ghost: "text-slate-700 hover:bg-forest-50 focus-visible:ring-forest-300"
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  className = ""
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
