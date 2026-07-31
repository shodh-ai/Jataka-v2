"use client";

import { useEffect, type ReactNode } from "react";
import { SmoothScroll, GlobalGrain, HomeFooter } from "../home";

export default function MarketingShell({
  children,
  showFooter = true,
}: {
  children: ReactNode;
  showFooter?: boolean;
}) {
  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    const prevColor = document.body.style.color;
    document.body.style.backgroundColor = "#F3F3F4";
    document.body.style.color = "#111111";
    document.documentElement.classList.add("home-route");

    return () => {
      document.body.style.backgroundColor = prevBg;
      document.body.style.color = prevColor;
      document.documentElement.classList.remove("home-route");
    };
  }, []);

  return (
    <SmoothScroll>
      <GlobalGrain />
      <main className="home-theme">
        {children}
        {showFooter ? <HomeFooter /> : null}
      </main>
    </SmoothScroll>
  );
}
