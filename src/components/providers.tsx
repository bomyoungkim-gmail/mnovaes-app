"use client";

import { PropsWithChildren, useEffect } from "react";
import Lenis from "lenis";

import { CartProvider } from "@/context/cart-context";

export function Providers({ children }: PropsWithChildren) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    if (process.env.NODE_ENV === "development") {
      void import("@/mocks/browser")
        .then(({ worker }) => worker.start({ onUnhandledRequest: "bypass" }))
        .catch(() => {
          // keep UI working when worker file is unavailable
        });
    }

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <CartProvider>{children}</CartProvider>;
}