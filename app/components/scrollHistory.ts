"use client";

/** sessionStorage scroll positions keyed by pathname + hash */

const STORAGE_KEY = "jataka:scroll-positions";

export function scrollKey(pathname?: string, hash?: string): string {
  if (typeof window === "undefined") {
    return `${pathname ?? "/"}${hash ?? ""}`;
  }
  const path = pathname ?? window.location.pathname;
  const h = hash !== undefined ? hash : window.location.hash;
  const normalized = h.startsWith("#") || h === "" ? h : `#${h}`;
  return `${path}${normalized}`;
}

export function saveScrollPosition(key: string, y: number) {
  if (typeof window === "undefined") return;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    map[key] = Math.max(0, Math.round(y));
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore quota / private mode */
  }
}

export function readScrollPosition(key: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw) as Record<string, number>;
    const y = map[key];
    return typeof y === "number" && Number.isFinite(y) ? y : null;
  } catch {
    return null;
  }
}

export function currentScrollY(): number {
  if (typeof window === "undefined") return 0;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/** Stay true briefly so every route effect on this pop can see it */
let popExpiresAt = 0;

export function markPopNavigation() {
  popExpiresAt = Date.now() + 1200;
}

export function isPopNavigation(): boolean {
  return Date.now() < popExpiresAt;
}
