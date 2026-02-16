"use client";

import { FormEvent, useState } from "react";

import { BaseLayout } from "@/components/layout/base-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";

type Mode = "login" | "register";

export default function AccountPage() {
  const { isAuthenticated, user, login, logout, register, loginWithGoogleMock } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [message, setMessage] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = login(String(form.get("email") ?? ""), String(form.get("password") ?? ""));
    setMessage(result.message);
  }

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = register(
      String(form.get("name") ?? ""),
      String(form.get("email") ?? ""),
      String(form.get("password") ?? "")
    );
    setMessage(result.message);
  }

  async function handleGoogleAuth() {
    setGoogleLoading(true);
    setMessage("");
    const result = await loginWithGoogleMock();
    setGoogleLoading(false);
    setMessage(result.message);
  }

  return (
    <BaseLayout>
      <h1 className="font-serif text-5xl md:text-7xl">Minha conta</h1>

      <div className="mt-8 max-w-2xl rounded-md border border-latelier-charcoal/15 bg-white/75 p-5 md:p-7">
        {isAuthenticated && user ? (
          <div className="space-y-4">
            <p className="text-xl">
              Olá, <span className="font-semibold">{user.name}</span>
            </p>
            <p className="text-sm text-latelier-charcoal/75">{user.email}</p>
            <Button type="button" variant="outline" onClick={logout}>
              Sair da conta
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="inline-flex rounded-md border border-latelier-charcoal/20 p-1">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`rounded-sm px-3 py-1.5 text-sm ${mode === "login" ? "bg-latelier-charcoal text-white" : "text-latelier-charcoal"}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`rounded-sm px-3 py-1.5 text-sm ${mode === "register" ? "bg-latelier-charcoal text-white" : "text-latelier-charcoal"}`}
              >
                Cadastro
              </button>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleAuth}
                disabled={googleLoading}
                className="w-full justify-center gap-2 border-latelier-charcoal/30 bg-white"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.8-6-6.2s2.7-6.2 6-6.2c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 2.9 14.7 2 12 2 6.9 2 2.8 6.4 2.8 11.8S6.9 21.6 12 21.6c6.9 0 9.2-5 9.2-7.6 0-.5 0-.9-.1-1.3H12z"
                  />
                  <path fill="#4285F4" d="M3.8 7.4l3.2 2.4c.9-2.1 2.7-3.5 5-3.5 1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 2.9 14.7 2 12 2 8.4 2 5.3 4.1 3.8 7.4z" />
                  <path fill="#FBBC05" d="M12 21.6c2.6 0 4.8-.9 6.4-2.5l-3.1-2.5c-.8.6-1.9 1-3.3 1-3.1 0-5.7-2.2-6.6-5.2l-3.2 2.5c1.5 3.9 5.2 6.7 9.8 6.7z" />
                  <path fill="#34A853" d="M5.4 12.4c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9L2.2 6.1C1.4 7.7 1 9.3 1 10.9s.4 3.2 1.2 4.8l3.2-2.5z" />
                </svg>
                {googleLoading ? "Conectando com Google..." : "Continuar com Google"}
              </Button>
              <div className="flex items-center gap-3 text-xs uppercase tracking-editorial text-latelier-charcoal/60">
                <span className="h-px flex-1 bg-latelier-charcoal/20" />
                <span>ou</span>
                <span className="h-px flex-1 bg-latelier-charcoal/20" />
              </div>
            </div>

            {mode === "login" ? (
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input id="login-password" name="password" type="password" required />
                </div>
                <Button type="submit">Entrar</Button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nome</Label>
                  <Input id="register-name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input id="register-email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <Input id="register-password" name="password" type="password" required />
                </div>
                <Button type="submit">Criar conta</Button>
              </form>
            )}
          </div>
        )}

        {message ? <p className="mt-4 text-sm text-latelier-charcoal/80">{message}</p> : null}
      </div>
    </BaseLayout>
  );
}
