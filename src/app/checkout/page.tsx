"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { OrderSummary } from "@/components/commerce/order-summary";
import { BaseLayout } from "@/components/layout/base-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";

export default function CheckoutPage() {
  const reduceMotion = useReducedMotion();
  const { subtotal } = useCart();
  const { isAuthenticated, user } = useAuth();

  return (
    <BaseLayout>
      <h1 className="font-serif text-5xl md:text-7xl">Checkout</h1>
      {!isAuthenticated ? (
        <p className="mt-2 text-sm text-latelier-charcoal/75">
          Faça login em{" "}
          <Link href="/account" className="underline">
            Minha conta
          </Link>{" "}
          para salvar seus dados.
        </p>
      ) : (
        <p className="mt-2 text-sm text-latelier-charcoal/75">Compra como {user?.name}</p>
      )}

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-8 grid gap-8 xl:grid-cols-[1fr_460px]"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <form className="space-y-4" aria-labelledby="shipping-title">
            <h2 id="shipping-title" className="text-3xl md:text-[2.1rem]">Endereço de entrega</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="first-name">Nome</Label>
                <Input id="first-name" name="first-name" autoComplete="given-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Sobrenome</Label>
                <Input id="last-name" name="last-name" autoComplete="family-name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address-line">Endereço</Label>
              <Input id="address-line" name="address-line" autoComplete="address-line1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" name="city" autoComplete="address-level2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input id="state" name="state" autoComplete="address-level1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input id="complement" name="complement" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Select defaultValue="br">
                <SelectTrigger id="country" aria-label="Selecionar país">
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="br">Brasil</SelectItem>
                  <SelectItem value="pt">Portugal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>

          <form className="space-y-4 rounded-lg border border-latelier-charcoal/15 p-4 md:p-6" aria-labelledby="payment-title">
            <h2 id="payment-title" className="text-3xl md:text-[2.1rem]">Método de pagamento</h2>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="h-11 min-w-24">Apple Pay</Button>
              <Button type="button" variant="outline" className="h-11 min-w-20">Visa</Button>
              <Button type="button" variant="outline" className="h-11 min-w-20">Mastercard</Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="card">Cartão</Label>
                <span className="inline-flex items-center gap-1 text-sm text-green-700">
                  <Lock className="h-4 w-4" /> Seguro
                </span>
              </div>
              <Input id="card" name="card" inputMode="numeric" autoComplete="cc-number" placeholder="Número do cartão" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="holder">Titular</Label>
                <Input id="holder" name="holder" autoComplete="cc-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Validade</Label>
                <Input id="expiry" name="expiry" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/AA" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" name="cvv" inputMode="numeric" autoComplete="cc-csc" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" name="cpf" inputMode="numeric" />
              </div>
            </div>
          </form>
        </div>

        <OrderSummary subtotal={subtotal} shipping={-2000} ctaLabel="Pagar agora" href="/checkout" sticky />
      </motion.div>
    </BaseLayout>
  );
}
