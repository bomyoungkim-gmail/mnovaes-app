"use client";

import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

type AuthUser = {
  name: string;
  email: string;
  password: string;
};

type PublicAuthUser = Omit<AuthUser, "password">;

type AuthContextValue = {
  user: PublicAuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { ok: boolean; message: string };
  register: (name: string, email: string, password: string) => { ok: boolean; message: string };
  logout: () => void;
};

const USER_STORAGE_KEY = "mnovaes:user";
const SESSION_STORAGE_KEY = "mnovaes:session";

const AuthContext = createContext<AuthContextValue | null>(null);

function getStoredUser() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed.email || !parsed.password || !parsed.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

function getStoredSession() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PublicAuthUser;
    if (!parsed.email || !parsed.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<PublicAuthUser | null>(null);

  useEffect(() => {
    setUser(getStoredSession());
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (email, password) => {
        const stored = getStoredUser();
        const normalizedEmail = email.trim().toLowerCase();

        if (!stored) {
          return { ok: false, message: "Nenhuma conta encontrada. Faça o cadastro primeiro." };
        }

        if (stored.email.toLowerCase() !== normalizedEmail || stored.password !== password) {
          return { ok: false, message: "Email ou senha inválidos." };
        }

        const sessionUser = { name: stored.name, email: stored.email };
        window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
        setUser(sessionUser);
        return { ok: true, message: "Login realizado com sucesso." };
      },
      register: (name, email, password) => {
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        if (!cleanName || !cleanEmail || !cleanPassword) {
          return { ok: false, message: "Preencha todos os campos." };
        }

        const newUser: AuthUser = {
          name: cleanName,
          email: cleanEmail,
          password: cleanPassword
        };

        const sessionUser = { name: newUser.name, email: newUser.email };
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
        window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
        setUser(sessionUser);
        return { ok: true, message: "Cadastro realizado com sucesso." };
      },
      logout: () => {
        window.localStorage.removeItem(SESSION_STORAGE_KEY);
        setUser(null);
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
