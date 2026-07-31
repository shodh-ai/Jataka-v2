"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  DESKTOP_LINKS,
  DOCS_ITEM,
  LOGIN_ITEM,
  MOBILE_SECTIONS,
  PRIMARY_CTA,
  PRODUCT_DROPDOWN,
  RESOURCES_DROPDOWN,
  type NavDropdown,
  type NavItem,
} from "./navigation.config";

function isActive(pathname: string, href: string) {
  if (href.startsWith("http")) {
    return false;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function LogoWordmark({ textColor }: { textColor: string }) {
  return (
    <svg className="h-[22px] w-auto block" viewBox="489.5 574 2305.4 484.92" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M877.432 574C930.994 574 974.419 617.425 974.419 670.987C974.418 697.813 963.525 722.093 945.923 739.648C924.44 761.073 901.681 786.114 901.681 816.454C901.681 846.795 924.441 871.837 945.923 893.264C963.526 910.822 974.418 935.105 974.419 961.932C974.419 1015.49 930.994 1058.92 877.432 1058.92C850.604 1058.92 826.319 1048.02 808.76 1030.42C787.337 1008.94 762.298 986.181 731.959 986.181C701.621 986.181 676.582 1008.94 655.159 1030.42C637.6 1048.02 613.315 1058.92 586.487 1058.92C532.925 1058.92 489.5 1015.49 489.5 961.932C489.502 908.371 532.926 864.953 586.487 864.953C613.316 864.954 637.601 875.848 655.159 893.453C676.582 914.934 701.622 937.691 731.959 937.691C762.297 937.691 787.402 914.81 808.854 893.357C830.307 871.902 853.191 846.795 853.191 816.454C853.191 786.114 830.432 761.074 808.949 739.649C791.346 722.093 780.454 697.813 780.453 670.987C780.453 617.426 823.871 574.002 877.432 574Z" fill={textColor} />
      <path d="M877.508 908.275C878.976 937.203 902.175 960.398 931.103 961.862L934.013 961.933C902.769 961.933 877.44 987.265 877.437 1018.51C877.435 987.266 852.105 961.933 820.862 961.933C852.106 961.931 877.437 936.601 877.437 905.358L877.508 908.275Z" fill="#2563EB" />
      <path d="M1292.08 685.6V907.648C1292.08 932.992 1285.03 952.72 1270.92 966.832C1257.09 980.944 1237.36 988 1211.73 988H1156V931.84H1191.86C1204.53 931.84 1213.6 928.96 1219.08 923.2C1224.55 917.152 1227.28 907.792 1227.28 895.12V685.6H1292.08Z" fill={textColor} />
      <path d="M1332.31 988L1442.9 685.6H1520.66L1630.39 988H1560.83L1537.51 921.904H1422.59L1399.27 988H1332.31ZM1439.87 869.632H1519.79L1479.62 754.72L1439.87 869.632Z" fill={textColor} />
      <path d="M1621.19 685.6H1860.52V741.328H1773.26V988H1708.46V741.328H1621.19V685.6Z" fill={textColor} />
      <path d="M1851.07 988L1961.66 685.6H2039.42L2149.15 988H2079.6L2056.27 921.904H1941.36L1918.03 988H1851.07ZM1958.64 869.632H2038.56L1998.38 754.72L1958.64 869.632Z" fill={textColor} />
      <path d="M2199.4 686.032H2264.2V821.68L2385.16 686.032H2463.79L2352.76 810.448L2471.13 988H2393.37L2306.97 860.56L2264.2 908.512V988H2199.4V686.032Z" fill={textColor} />
      <path d="M2496.82 988L2607.41 685.6H2685.17L2794.9 988H2725.35L2702.02 921.904H2587.11L2563.78 988H2496.82ZM2604.39 869.632H2684.31L2644.13 754.72L2604.39 869.632Z" fill={textColor} />
    </svg>
  );
}

function NavLink({
  item,
  pathname,
  mobile = false,
  dark = false,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  mobile?: boolean;
  dark?: boolean;
  onNavigate?: () => void;
}) {
  const baseClass = mobile
    ? `block w-full text-center text-[18px] font-medium py-3.5 ${dark ? "text-[#E8E4DC]" : "text-[#1a1a1a]"}`
    : "text-[12.5px] font-medium tracking-[0.3px] transition-colors xl:text-[13.5px] xl:tracking-[0.4px]";
  const stateClass = isActive(pathname, item.href)
    ? dark
      ? "text-[#E8E4DC]"
      : "text-[#1a1a1a]"
    : dark
      ? "text-[#7A8BA8] hover:text-[#E8E4DC]"
      : "text-[#666] hover:text-[#1a1a1a]";

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${baseClass} ${stateClass}`} onClick={onNavigate}>
        {item.label}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={`${baseClass} ${stateClass}`}
      onClick={() => {
        onNavigate?.();
      }}
    >
      {item.label}
    </Link>
  );
}

function DropdownMenu({
  dropdown,
  pathname,
  dark,
}: {
  dropdown: NavDropdown;
  pathname: string;
  dark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const dropdownBg = dark ? "bg-[#0C1320] border-[rgba(255,255,255,0.08)]" : "bg-white border-[#1a1a1a]/10";
  const itemHover = dark ? "hover:bg-[rgba(255,255,255,0.05)] text-[#E8E4DC]" : "hover:bg-[#F3F3F4] text-[#1a1a1a]";
  const triggerClass = dark
    ? "text-[#7A8BA8] hover:text-[#E8E4DC]"
    : "text-[#666] hover:text-[#1a1a1a]";
  const isAnyActive = dropdown.items.some((item) => isActive(pathname, item.href));

  return (
    <li className="relative pt-[8px] -mt-[8px]" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((current) => !current)}
        className={`flex items-center gap-[5px] text-[12.5px] font-medium tracking-[0.3px] transition-colors xl:gap-[6px] xl:text-[13.5px] xl:tracking-[0.4px] ${isAnyActive ? (dark ? "text-[#E8E4DC]" : "text-[#1a1a1a]") : triggerClass}`}
      >
        {dropdown.label}
        <svg className={`h-[12px] w-[12px] transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className={`absolute top-full left-0 z-[230] w-[280px] rounded-[12px] border py-[8px] shadow-lg ${dropdownBg}`}>
          {dropdown.items.map((item) =>
            item.external ? (
              <a
                key={`${dropdown.label}-${item.label}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`block w-full whitespace-nowrap px-[16px] py-[8px] text-left text-[13px] leading-[1.35] transition-colors ${itemHover}`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={`${dropdown.label}-${item.label}`}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block w-full whitespace-nowrap px-[16px] py-[8px] text-left text-[13px] leading-[1.35] transition-colors ${itemHover}`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </li>
  );
}


/** Soft spring so expand (pill → full) eases instead of snapping when returning to hero */
const NAV_SPRING = { stiffness: 48, damping: 18, mass: 1.2 };

function MobileAccordion({
  dropdown,
  pathname,
  dark,
  open,
  onToggle,
  onNavigate,
}: {
  dropdown: NavDropdown;
  pathname: string;
  dark: boolean;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const labelClass = dark ? "text-[#E8E4DC]" : "text-[#111]";
  const mutedClass = dark ? "text-[#7A8BA8]" : "text-[#8A93A3]";
  const itemClass = dark
    ? "text-[#A8B4C8] hover:text-[#E8E4DC]"
    : "text-[#5F5F66] hover:text-[#111]";

  return (
    <div className="border-b border-[#111]/06 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`flex w-full items-center justify-center gap-2.5 py-5 text-[20px] font-semibold tracking-[-0.01em] ${labelClass}`}
      >
        {dropdown.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex ${mutedClass}`}
          aria-hidden
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-1 pb-4">
              {dropdown.items.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.28 }}
                  className="w-full"
                >
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onNavigate}
                      className={`block w-full py-3 text-center text-[16px] ${itemClass} ${
                        isActive(pathname, item.href) ? (dark ? "text-[#E8E4DC]" : "text-[#111]") : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={`block w-full py-3 text-center text-[16px] ${itemClass} ${
                        isActive(pathname, item.href) ? (dark ? "text-[#E8E4DC]" : "text-[#111]") : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MobileMenuPanel({
  open,
  dark,
  isHome,
  pathname,
  bgClass,
  onClose,
}: {
  open: boolean;
  dark: boolean;
  isHome: boolean;
  pathname: string;
  bgClass: string;
  onClose: () => void;
}) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setOpenSection(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: "-6%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-4%" }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 z-[210] flex h-[100dvh] w-full flex-col lg:hidden ${bgClass}`}
        >
          <motion.nav
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
            }}
            className="flex h-full flex-col overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[96px] sm:px-8"
          >
            <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-between gap-6">
              <div className="flex flex-col">
              {MOBILE_SECTIONS.map((section) => (
                <motion.div
                  key={section.label}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  <MobileAccordion
                    dropdown={section}
                    pathname={pathname}
                    dark={dark}
                    open={openSection === section.label}
                    onToggle={() =>
                      setOpenSection((current) =>
                        current === section.label ? null : section.label
                      )
                    }
                    onNavigate={onClose}
                  />
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
                className="mt-6 flex flex-col items-center gap-1 border-t border-[#111]/08 pt-6"
              >
                {DESKTOP_LINKS.map((item) => (
                  <NavLink
                    key={`mobile-link-${item.label}`}
                    item={item}
                    pathname={pathname}
                    mobile
                    dark={dark}
                    onNavigate={onClose}
                  />
                ))}
                <NavLink
                  item={DOCS_ITEM}
                  pathname={pathname}
                  mobile
                  dark={dark}
                  onNavigate={onClose}
                />
                <NavLink
                  item={LOGIN_ITEM}
                  pathname={pathname}
                  mobile
                  dark={dark}
                  onNavigate={onClose}
                />
              </motion.div>
              </div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
                className="pt-4 pb-2"
              >
                <Link
                  href={PRIMARY_CTA.href}
                  onClick={onClose}
                  className="btn-primary-bloom flex w-full items-center justify-center rounded-full bg-[#111] py-4 text-[15px] font-medium text-white"
                >
                  {isHome ? "Request access →" : PRIMARY_CTA.label}
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function HomeMorphHeader({
  children,
  onFloatChange,
}: {
  children: ReactNode;
  onFloatChange: (floated: boolean) => void;
}) {
  const [ready, setReady] = useState(false);
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, NAV_SPRING);
  const floatedRef = useRef(false);
  const viewportW = useMotionValue(1200);

  const marginTop = useTransform(smooth, [0, 1], [0, 12]);
  const borderRadius = useTransform(smooth, [0, 1], [0, 9999]);
  const height = useTransform(smooth, [0, 1], [64, 56]);
  const paddingX = useTransform([smooth, viewportW], ([v, vw]) => {
    const fullPad = (vw as number) >= 768 ? 48 : 16;
    const pillPad = (vw as number) >= 768 ? 28 : 16;
    return fullPad + (pillPad - fullPad) * (v as number);
  });
  const bg = useTransform(
    smooth,
    [0, 1],
    ["rgba(243,243,244,0.82)", "rgba(255,255,255,0.96)"]
  );
  const borderColor = useTransform(
    smooth,
    [0, 1],
    ["rgba(17,17,17,0.06)", "rgba(17,17,17,0.08)"]
  );
  const sideBorder = useTransform(smooth, [0, 1], [0, 1]);
  const shadow = useTransform(
    smooth,
    [0, 1],
    ["0 0 0 rgba(17,17,17,0)", "0 12px 40px rgba(17,17,17,0.08)"]
  );
  const width = useTransform([smooth, viewportW], ([v, vw]) => {
    const full = vw as number;
    const gutter = (vw as number) >= 768 ? 24 : 16;
    const pill = Math.min(1120, Math.max(0, full - gutter));
    return full + (pill - full) * (v as number);
  });
  const boxShadow = useMotionTemplate`${shadow}`;

  useEffect(() => {
    const update = () => {
      viewportW.set(window.innerWidth);
      const y = window.scrollY;
      const t = Math.min(1, Math.max(0, (y - 16) / 150));
      progress.set(t);
    };
    update();
    setReady(true);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress, viewportW]);

  useMotionValueEvent(smooth, "change", (v) => {
    const next = v > 0.45;
    if (floatedRef.current === next) return;
    floatedRef.current = next;
    onFloatChange(next);
  });

  // SSR + first paint: static full-width bar (no window-based width) to avoid hydration mismatch
  if (!ready) {
    return (
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[220] flex justify-center">
        <header className="pointer-events-auto relative flex h-16 w-full items-center justify-between border-b border-[rgba(17,17,17,0.06)] bg-[rgba(243,243,244,0.82)] px-6 backdrop-blur-xl md:px-12">
          {children}
        </header>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[220] flex justify-center">
      <motion.header
        className="pointer-events-auto relative flex items-center justify-between will-change-[width,transform,border-radius] backdrop-blur-xl"
        style={{
          marginTop,
          width,
          borderRadius,
          height,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          backgroundColor: bg,
          borderTopColor: borderColor,
          borderRightColor: borderColor,
          borderBottomColor: borderColor,
          borderLeftColor: borderColor,
          boxShadow,
          borderTopStyle: "solid",
          borderRightStyle: "solid",
          borderBottomStyle: "solid",
          borderLeftStyle: "solid",
          borderTopWidth: sideBorder,
          borderRightWidth: sideBorder,
          borderBottomWidth: 1,
          borderLeftWidth: sideBorder,
        }}
      >
        {children}
      </motion.header>
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  const isDarkRoute = false; // all public marketing routes use the light system
  const isDataRoomRoute = pathname.startsWith("/insider/dataroom-botcon");
  const isHome = pathname === "/";
  const textColor = "#111111";
  const mobileBg = isHome
    ? "bg-white border-[rgba(17,17,17,0.08)]"
    : "bg-[#F3F3F4] border-[rgba(17,17,17,0.08)]";

  const links = (
    <ul className="m-0 hidden list-none items-center gap-3 p-0 lg:flex xl:gap-5 2xl:gap-6">
      <DropdownMenu dropdown={PRODUCT_DROPDOWN} pathname={pathname} dark={isDarkRoute} />
      <DropdownMenu dropdown={RESOURCES_DROPDOWN} pathname={pathname} dark={isDarkRoute} />
      <li>
        <NavLink item={DOCS_ITEM} pathname={pathname} dark={isDarkRoute} />
      </li>
      {DESKTOP_LINKS.map((item) => (
        <li key={item.label}>
          <NavLink item={item} pathname={pathname} dark={isDarkRoute} />
        </li>
      ))}
      <li>
        <NavLink item={LOGIN_ITEM} pathname={pathname} dark={isDarkRoute} />
      </li>
    </ul>
  );

  const mobileMenu = !isDataRoomRoute ? (
    <MobileMenuPanel
      open={isMobileMenuOpen}
      dark={isDarkRoute}
      isHome={isHome}
      pathname={pathname}
      bgClass={mobileBg}
      onClose={() => setIsMobileMenuOpen(false)}
    />
  ) : null;

  const goHomeHero = (e: MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      // Clear any section hash so we truly land on hero
      if (window.location.hash) {
        window.history.pushState(null, "", "/");
      }
      // Slow Lenis scroll to top — do not also call native scrollTo (that feels fast)
      window.dispatchEvent(new Event("jataka:scroll-to-top"));
    }
  };

  if (isHome) {
    return (
      <>
        <HomeMorphHeader onFloatChange={() => {}}>
          <Link href="/" className="flex shrink-0 items-center" onClick={goHomeHero}>
            <LogoWordmark textColor={textColor} />
          </Link>

          {!isDataRoomRoute && (
            <>
              <nav className="m-0 hidden list-none items-center gap-3 p-0 lg:flex xl:gap-5 2xl:gap-6">
                {links}
                <Link
                  href={PRIMARY_CTA.href}
                  className="btn-primary-bloom ml-1 inline-flex shrink-0 items-center justify-center rounded-full bg-[#111] px-3.5 py-2 text-[12px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] xl:ml-2 xl:px-4"
                >
                  Request access →
                </Link>
              </nav>

              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                className="relative flex h-10 w-10 items-center justify-center lg:hidden"
                style={{ color: textColor }}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMobileMenuOpen ? "close" : "menu"}
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </>
          )}
        </HomeMorphHeader>
        {mobileMenu}
      </>
    );
  }

  const headerShell =
    "fixed top-0 left-0 right-0 z-[220] h-[64px] border-b border-[rgba(17,17,17,0.08)] bg-[#F3F3F4]/92 px-4 backdrop-blur-[14px] sm:px-6 md:px-10 lg:px-[48px]";

  return (
    <>
      <header className={`${headerShell} flex items-center justify-between`}>
        <Link href="/" className="flex items-center" onClick={goHomeHero}>
          <LogoWordmark textColor={textColor} />
        </Link>

        {!isDataRoomRoute && (
          <>
            <nav className="m-0 hidden list-none items-center gap-3 p-0 lg:flex xl:gap-5 2xl:gap-6">
              {links}
              <Link
                href={PRIMARY_CTA.href}
                className="btn-primary-bloom ml-1 inline-flex shrink-0 items-center justify-center rounded-full bg-[#111] px-3.5 py-2 text-[12px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] xl:ml-2 xl:px-4"
              >
                {PRIMARY_CTA.label}
              </Link>
            </nav>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="relative flex h-10 w-10 items-center justify-center lg:hidden"
              style={{ color: textColor }}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMobileMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </>
        )}
      </header>
      {mobileMenu}
    </>
  );
}
