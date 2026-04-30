import { AuthForm } from "@/components/AuthForm";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <AuthForm mode="register" />
    </section>
  );
}
