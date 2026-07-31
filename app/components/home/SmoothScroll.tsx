"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  currentScrollY,
  isPopNavigation,
  readScrollPosition,
  saveScrollPosition,
  scrollKey,
} from "../scrollHistory";

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = 80;

type LenisContextValue = {
  scrollTo: (
    target: number | string | HTMLElement,
    opts?: { immediate?: boolean; offset?: number; duration?: number }
  ) => void;
  scrollToTop: (immediate?: boolean) => void;
  scrollToId: (id: string, opts?: { immediate?: boolean }) => void;
  /** Pause Lenis so native print layout is not transform-warped */
  stop: () => void;
  start: () => void;
};

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
  scrollToTop: () => {},
  scrollToId: () => {},
  stop: () => {},
  start: () => {},
});

export function useLenisScroll() {
  return useContext(LenisContext);
}

/** Prefer ScrollTrigger.start for pinned sections so we land at the section intro, not mid-pin. */
function resolveYForElement(el: HTMLElement, headerOffset = HEADER_OFFSET): number {
  const triggers = ScrollTrigger.getAll().filter((st) => {
    const t = st.trigger;
    if (!t || !(t instanceof Element)) return false;
    return t === el || el.contains(t) || t.contains(el);
  });

  if (triggers.length > 0) {
    const start = Math.min(...triggers.map((st) => st.start));
    // Pin sections typically use start "top top" — keep flush with viewport.
    // Non-pin triggers still benefit from a small header offset.
    const hasPin = triggers.some((st) => Boolean(st.pin));
    return Math.max(0, hasPin ? start : start - headerOffset);
  }

  return Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - headerOffset
  );
}

function readHash(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#/, "");
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const pathnameRef = useRef(pathname);
  const scrollJobRef = useRef(0);

  const applyScrollY = useCallback((y: number, opts?: { immediate?: boolean; duration?: number }) => {
    const lenis = lenisRef.current;
    const immediate = opts?.immediate ?? false;
    if (lenis) {
      const duration = immediate ? undefined : opts?.duration ?? 1.05;
      lenis.scrollTo(y, {
        immediate,
        duration,
        force: true,
        lock: true,
        // Slower section jumps feel more intentional than default ease
        easing:
          !immediate && duration && duration >= 1.8
            ? (t: number) => 1 - Math.pow(1 - t, 3)
            : undefined,
      });
    } else {
      window.scrollTo({
        top: y,
        behavior: immediate ? "auto" : "smooth",
      });
    }
  }, []);

  const scrollToTop = useCallback(
    (immediate = true) => {
      applyScrollY(0, { immediate });
      // Native fallback — Lenis can lag one frame behind on remount
      if (immediate) window.scrollTo(0, 0);
    },
    [applyScrollY]
  );

  const scrollToId = useCallback(
    (id: string, opts?: { immediate?: boolean }) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.refresh();
      const y = resolveYForElement(el);
      applyScrollY(y, {
        immediate: opts?.immediate ?? false,
        duration: 1.1,
      });
    },
    [applyScrollY]
  );

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const root = document.documentElement;

    const onScrollActivity = () => {
      root.classList.add("is-scrolling");
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        root.classList.remove("is-scrolling");
      }, 900);
    };

    lenis.on("scroll", onScrollActivity);
    window.addEventListener("wheel", onScrollActivity, { passive: true });
    window.addEventListener("touchmove", onScrollActivity, { passive: true });

    // Broadcast scroll so SiteHeader (outside SmoothScroll) can morph on every page
    const broadcastScroll = (e: { scroll: number }) => {
      window.dispatchEvent(
        new CustomEvent("jataka:scroll", { detail: { scroll: e.scroll } })
      );
    };
    lenis.on("scroll", broadcastScroll);

    const persistScroll = () => {
      saveScrollPosition(scrollKey(), lenis.scroll || currentScrollY());
    };
    lenis.on("scroll", persistScroll);

    const onScrollToTop = () => {
      // Pinned scrub sections (Paradigm / Dashboard) fight Lenis on the way up —
      // temporarily collapse them so the glide isn't stuck reversing pin progress.
      const beforeY = lenis.scroll || currentScrollY();
      const blockers = ScrollTrigger.getAll().filter(
        (st) => Boolean(st.pin) || st.vars.scrub === true || typeof st.vars.scrub === "number"
      );

      blockers.forEach((st) => {
        try {
          st.disable(true);
        } catch {
          /* ignore already-killed triggers */
        }
      });

      // Recalc page height without pin spacers, then re-sync scroll so layout
      // collapse doesn't leave Lenis on a stale offset.
      ScrollTrigger.refresh();
      lenis.resize();
      const syncedY = Math.min(beforeY, lenis.limit);
      lenis.scrollTo(syncedY, { immediate: true, force: true });

      const duration = Math.min(3.6, Math.max(1.6, (syncedY / window.innerHeight) * 0.55));

      lenis.scrollTo(0, {
        duration,
        immediate: false,
        force: true,
        lock: true,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          blockers.forEach((st) => {
            try {
              st.enable();
              if (st.animation) st.animation.progress(0);
            } catch {
              /* ignore */
            }
          });
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            lenis.resize();
          });
        },
      });
    };
    window.addEventListener("jataka:scroll-to-top", onScrollToTop);

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      window.clearTimeout(refreshTimer);
      window.removeEventListener("wheel", onScrollActivity);
      window.removeEventListener("touchmove", onScrollActivity);
      window.removeEventListener("jataka:scroll-to-top", onScrollToTop);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
      root.classList.remove("is-scrolling");
    };
  }, []);

  // Route / hash: top on forward nav; restore on browser back/forward
  useEffect(() => {
    const hash = readHash();
    const routeChanged = pathnameRef.current !== pathname;
    pathnameRef.current = pathname;
    const job = ++scrollJobRef.current;
    const wasPop = isPopNavigation();

    const root = document.documentElement;
    root.classList.add("scroll-lock-instant");

    const goY = (y: number, immediate = true) => {
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(y, { immediate, force: true, lock: true });
      window.scrollTo(0, y);
    };

    const goTop = () => goY(0, true);

    const goHash = (immediate: boolean) => {
      const el = document.getElementById(hash);
      if (!el) return false;
      ScrollTrigger.refresh();
      const y = resolveYForElement(el);
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(y, {
          immediate,
          force: true,
          lock: true,
          duration: immediate ? undefined : 1.1,
        });
      } else {
        window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
      }
      return true;
    };

    // Browser back/forward: restore saved position (e.g. footer)
    if (wasPop) {
      const key = scrollKey(pathname, window.location.hash);
      const saved = readScrollPosition(key);
      const targetY = saved ?? 0;
      goY(targetY, true);
      const timers = [50, 140, 300, 520].map((ms) =>
        window.setTimeout(() => {
          if (job !== scrollJobRef.current) return;
          ScrollTrigger.refresh();
          goY(targetY, true);
        }, ms)
      );
      const unlock = window.setTimeout(() => {
        root.classList.remove("scroll-lock-instant");
      }, 560);
      return () => {
        timers.forEach((t) => window.clearTimeout(t));
        window.clearTimeout(unlock);
        root.classList.remove("scroll-lock-instant");
      };
    }

    // Forward nav with hash → section target
    if (hash) {
      goTop();
      const delays = routeChanged ? [0, 50, 120, 280, 500, 800] : [0, 40, 160, 320];
      const timers = delays.map((ms, i) =>
        window.setTimeout(() => {
          if (job !== scrollJobRef.current) return;
          const last = i === delays.length - 1;
          goHash(!last || routeChanged);
          if (i === 1 || last) ScrollTrigger.refresh();
        }, ms)
      );
      const unlock = window.setTimeout(() => {
        root.classList.remove("scroll-lock-instant");
      }, Math.max(...delays) + 50);
      return () => {
        timers.forEach((t) => window.clearTimeout(t));
        window.clearTimeout(unlock);
        root.classList.remove("scroll-lock-instant");
      };
    }

    // Forward nav without hash → top
    goTop();
    const delays = routeChanged ? [0, 40, 120, 280] : [0];
    const timers = delays.map((ms) =>
      window.setTimeout(() => {
        if (job !== scrollJobRef.current) return;
        goTop();
        if (ms > 0) ScrollTrigger.refresh();
      }, ms)
    );
    const unlock = window.setTimeout(() => {
      root.classList.remove("scroll-lock-instant");
    }, Math.max(...delays) + 50);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(unlock);
      root.classList.remove("scroll-lock-instant");
    };
  }, [pathname]);

  // Same-page hash changes + browser back/forward within home hashes
  useEffect(() => {
    let timers: number[] = [];

    const runToHash = (hash: string, immediate: boolean) => {
      const el = document.getElementById(hash);
      if (!el) return;
      ScrollTrigger.refresh();
      const y = resolveYForElement(el);
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(y, {
          immediate,
          force: true,
          lock: true,
          duration: immediate ? undefined : 1.1,
        });
      } else {
        window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
      }
    };

    const restorePop = () => {
      const key = scrollKey();
      const saved = readScrollPosition(key);
      const targetY = saved ?? 0;
      const lenis = lenisRef.current;
      const root = document.documentElement;
      root.classList.add("scroll-lock-instant");
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];

      const apply = () => {
        ScrollTrigger.refresh();
        if (lenis) lenis.scrollTo(targetY, { immediate: true, force: true, lock: true });
        window.scrollTo(0, targetY);
      };
      apply();
      timers.push(window.setTimeout(apply, 60));
      timers.push(window.setTimeout(apply, 180));
      timers.push(window.setTimeout(apply, 400));
      timers.push(
        window.setTimeout(() => {
          root.classList.remove("scroll-lock-instant");
        }, 450)
      );
    };

    const onHash = () => {
      if (isPopNavigation()) {
        restorePop();
        return;
      }
      const hash = readHash();
      if (!hash) return;
      const job = ++scrollJobRef.current;
      const root = document.documentElement;
      root.classList.add("scroll-lock-instant");
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];

      const run = (immediate: boolean) => {
        if (job !== scrollJobRef.current) return;
        runToHash(hash, immediate);
      };

      run(true);
      timers.push(window.setTimeout(() => run(true), 60));
      timers.push(window.setTimeout(() => run(false), 180));
      timers.push(
        window.setTimeout(() => {
          root.classList.remove("scroll-lock-instant");
        }, 400)
      );
    };

    const onPop = () => {
      // Lenis pages: restore saved Y after back/forward (incl. hash-only)
      window.setTimeout(() => {
        if (!isPopNavigation()) return;
        restorePop();
      }, 0);
    };

    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onPop);
      timers.forEach((t) => window.clearTimeout(t));
      document.documentElement.classList.remove("scroll-lock-instant");
    };
  }, []);

  const api: LenisContextValue = {
    scrollTo: (target, opts) => {
      if (typeof target === "number") {
        applyScrollY(target, opts);
        return;
      }
      const el =
        typeof target === "string"
          ? document.querySelector(target)
          : target;
      if (!(el instanceof HTMLElement)) return;
      ScrollTrigger.refresh();
      const headerOffset =
        opts?.offset !== undefined ? Math.abs(opts.offset) : HEADER_OFFSET;
      applyScrollY(resolveYForElement(el, headerOffset), opts);
    },
    scrollToTop,
    scrollToId,
    stop: () => {
      lenisRef.current?.stop();
    },
    start: () => {
      lenisRef.current?.start();
    },
  };

  return <LenisContext.Provider value={api}>{children}</LenisContext.Provider>;
}
