"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { authService } from "@/services/authService";
import { getApiErrorMessage, jobPortalService } from "@/services/jobService";

type AuthMode = "login" | "register";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const data = isRegister
        ? await jobPortalService.register({ name, email, password })
        : await jobPortalService.login({ email, password });

      authService.saveSession(data.token, data.user);
      setSuccess(isRegister ? "Account created successfully." : "Login successful.");
      setTimeout(() => router.push("/jobs"), 400);
    } catch (err) {
      setError(getApiErrorMessage(err, "We could not complete that request."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="glass-panel w-full max-w-md rounded-lg p-6 shadow-lift">
      <div className="mb-8">
        <p className="text-sm font-semibold text-forest-700">HireFlow</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">
          {isRegister ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          {isRegister
            ? "Register to apply for roles, save jobs, and track your progress."
            : "Log in to continue your job search and review your pipeline."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {isRegister ? (
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Full name</span>
            <div className="relative mt-2">
              <Icon name="user" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="h-11 w-full rounded-md border border-slate-200 bg-white/90 px-10 text-sm outline-none transition focus:border-forest-500 focus:ring-4 focus:ring-forest-100"
                placeholder="Alex Morgan"
              />
            </div>
          </label>
        ) : null}

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <div className="relative mt-2">
            <Icon name="mail" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="h-11 w-full rounded-md border border-slate-200 bg-white/90 px-10 text-sm outline-none transition focus:border-forest-500 focus:ring-4 focus:ring-forest-100"
              placeholder="you@example.com"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <div className="relative mt-2">
            <Icon name="lock" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              className="h-11 w-full rounded-md border border-slate-200 bg-white/90 px-10 text-sm outline-none transition focus:border-forest-500 focus:ring-4 focus:ring-forest-100"
              placeholder="At least 6 characters"
            />
          </div>
        </label>

        {error ? (
          <p className="rounded-md border border-coral-500/25 bg-coral-50 px-3 py-2 text-sm text-coral-600">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {success}
          </p>
        ) : null}

        <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
          {isSubmitting ? "Please wait..." : isRegister ? "Register" : "Login"}
          <Icon name="arrow" className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        {isRegister ? "Already have an account?" : "New to HireFlow?"}{" "}
        <Link
          href={isRegister ? "/login" : "/register"}
          className="font-semibold text-forest-700 hover:text-forest-600"
        >
          {isRegister ? "Login" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
