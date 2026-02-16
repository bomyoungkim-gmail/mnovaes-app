"use client";

import { FormEvent, useState } from "react";

import { BaseLayout } from "@/components/layout/base-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";

type Mode = "login" | "register";

export default function AccountPage() {
  const { isAuthenticated, user, login, logout, register } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [message, setMessage] = useState("");

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
