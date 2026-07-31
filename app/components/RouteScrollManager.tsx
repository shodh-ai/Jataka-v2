"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  currentScrollY,
  isPopNavigation,
  markPopNavigation,
  readScrollPosition,
  saveScrollPosition,
  scrollKey,
} from "./scrollHistory";

function jumpWindow(y: number) {
  window.scrollTo(0, y);
  document.documentElement.scrollTop = y;
  document.body.scrollTop = y;
}

/**
 * - Saves scroll while the user moves around a page
 * - On link navigations: jump to top (unless hash — SmoothScroll owns that)
 * - On browser back/forward: restore the saved scroll for that URL
 */
export default function RouteScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const restoreForCurrentUrl = () => {
      const key = scrollKey();
      const saved = readScrollPosition(key);
      const targetY = saved ?? 0;
      const root = document.documentElement;
      root.classList.add("scroll-lock-instant");
      jumpWindow(targetY);
      const timers = [40, 120, 280, 500].map((ms) =>
        window.setTimeout(() => jumpWindow(targetY), ms)
      );
      window.setTimeout(() => {
        root.classList.remove("scroll-lock-instant");
      }, 540);
      return timers;
    };

    const onPop = () => {
      markPopNavigation();
      // Hash-only history changes do not update Next pathname — restore here
      restoreForCurrentUrl();
    };
    window.addEventListener("popstate", onPop);

    let raf = 0;
    const persist = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        saveScrollPosition(scrollKey(), currentScrollY());
      });
    };
    window.addEventListener("scroll", persist, { passive: true });

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (/^https?:\/\//i.test(href) && !href.includes(window.location.host)) return;
      saveScrollPosition(scrollKey(), currentScrollY());
    };
    document.addEventListener("pointerdown", onPointerDown, true);

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("scroll", persist);
      document.removeEventListener("pointerdown", onPointerDown, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const hash =
      typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
    const key = scrollKey(pathname, window.location.hash);
    const wasPop = isPopNavigation();
    const root = document.documentElement;
    root.classList.add("scroll-lock-instant");

    if (wasPop) {
      const saved = readScrollPosition(key);
      const targetY = saved ?? 0;
      jumpWindow(targetY);
      const timers = [40, 120, 280, 500].map((ms) =>
        window.setTimeout(() => jumpWindow(targetY), ms)
      );
      const unlock = window.setTimeout(() => {
        root.classList.remove("scroll-lock-instant");
      }, 540);
      return () => {
        timers.forEach((t) => window.clearTimeout(t));
        window.clearTimeout(unlock);
        root.classList.remove("scroll-lock-instant");
      };
    }

    if (hash) {
      root.classList.remove("scroll-lock-instant");
      return;
    }

    jumpWindow(0);
    const timers = [0, 40, 120, 280].map((ms) =>
      window.setTimeout(() => jumpWindow(0), ms)
    );
    const unlock = window.setTimeout(() => {
      root.classList.remove("scroll-lock-instant");
    }, 320);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(unlock);
      root.classList.remove("scroll-lock-instant");
    };
  }, [pathname]);

  return null;
}
