"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  COMPARE_DROPDOWN,
  DESKTOP_LINKS,
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
      <path d="M877.508 908.275C878.976 937.203 902.175 960.398 931.103 961.862L934.013 961.933C902.769 961.933 877.44 987.265 877.437 1018.51C877.435 987.266 852.105 961.933 820.862 961.933C852.106 961.931 877.437 936.601 877.437 905.358L877.508 908.275Z" fill="#FF2424" />
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
    ? `text-left text-[15px] font-medium py-2 ${dark ? "text-[#E8E4DC]" : "text-[#1a1a1a]"}`
    : "text-[13.5px] font-medium tracking-[0.4px] transition-colors";
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
    <Link href={item.href} className={`${baseClass} ${stateClass}`} onClick={onNavigate}>
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
  const itemHover = dark ? "hover:bg-[rgba(255,255,255,0.05)] text-[#E8E4DC]" : "hover:bg-[#FAF8F3] text-[#1a1a1a]";
  const triggerClass = dark
    ? "text-[#7A8BA8] hover:text-[#E8E4DC]"
    : "text-[#666] hover:text-[#1a1a1a]";
  const isAnyActive = dropdown.items.some((item) => isActive(pathname, item.href));

  return (
    <li className="relative pt-[8px] -mt-[8px]" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((current) => !current)}
        className={`transition-colors text-[13.5px] font-medium tracking-[0.4px] flex items-center gap-[6px] ${isAnyActive ? (dark ? "text-[#E8E4DC]" : "text-[#1a1a1a]") : triggerClass}`}
      >
        {dropdown.label}
        <svg className={`w-[12px] h-[12px] transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className={`absolute top-full left-0 w-[280px] rounded-[8px] shadow-lg border py-[8px] z-[230] ${dropdownBg}`}>
          {dropdown.items.map((item) => (
            item.external ? (
              <a
                key={`${dropdown.label}-${item.label}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`block w-full text-left px-[16px] py-[8px] text-[13px] leading-[1.35] whitespace-nowrap transition-colors ${itemHover}`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={`${dropdown.label}-${item.label}`}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block w-full text-left px-[16px] py-[8px] text-[13px] leading-[1.35] whitespace-nowrap transition-colors ${itemHover}`}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      )}
    </li>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDarkRoute = pathname.startsWith("/book-pilot");
  const textColor = isDarkRoute ? "#E8E4DC" : "#1a1a1a";
  const headerBg = isDarkRoute ? "bg-[rgba(6,12,22,0.88)] border-[rgba(255,255,255,0.06)]" : "bg-[#FAF8F3]/90 border-[#1a1a1a]/10";
  const mobileBg = isDarkRoute ? "bg-[#0C1320] border-[rgba(255,255,255,0.08)]" : "bg-[#FAF8F3] border-[#1a1a1a]/10";

  return (
    <header className={`fixed top-0 left-0 right-0 z-[220] h-[64px] backdrop-blur-[14px] border-b px-[24px] md:px-[48px] flex items-center justify-between ${headerBg}`}>
      <Link href="/" className="flex items-center">
        <LogoWordmark textColor={textColor} />
      </Link>

      <nav className="hidden md:flex gap-[24px] list-none items-center m-0 p-0">
        <ul className="hidden md:flex gap-[24px] list-none items-center m-0 p-0">
          <DropdownMenu dropdown={PRODUCT_DROPDOWN} pathname={pathname} dark={isDarkRoute} />
          <DropdownMenu dropdown={COMPARE_DROPDOWN} pathname={pathname} dark={isDarkRoute} />
          {DESKTOP_LINKS.map((item) => (
            <li key={item.label}>
              <NavLink item={item} pathname={pathname} dark={isDarkRoute} />
            </li>
          ))}
          <DropdownMenu dropdown={RESOURCES_DROPDOWN} pathname={pathname} dark={isDarkRoute} />
          <li>
            <NavLink item={{ label: "Docs", href: "https://docs.jataka.io", external: true }} pathname={pathname} dark={isDarkRoute} />
          </li>
          <li>
            <NavLink item={LOGIN_ITEM} pathname={pathname} dark={isDarkRoute} />
          </li>
        </ul>
        <Link
          href={PRIMARY_CTA.href}
          className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors"
        >
          {PRIMARY_CTA.label}
        </Link>
      </nav>

      <button className="md:hidden p-2" style={{ color: textColor }} onClick={() => setIsMobileMenuOpen((open) => !open)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobileMenuOpen && (
        <div className={`absolute top-[64px] left-0 w-full border-b p-6 flex flex-col gap-4 md:hidden shadow-2xl z-[210] ${mobileBg}`}>
          {MOBILE_SECTIONS.map((section) => (
            <div key={`section-${section.label}`} className="flex flex-col gap-2">
              <div className={`text-[11px] uppercase tracking-[1.5px] font-bold ${isDarkRoute ? "text-[#7A8BA8]" : "text-[#666]"}`}>
                {section.label}
              </div>
              {section.items.map((item) => (
                <NavLink
                  key={`mobile-${section.label}-${item.label}`}
                  item={item}
                  pathname={pathname}
                  mobile
                  dark={isDarkRoute}
                  onNavigate={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </div>
          ))}
          {DESKTOP_LINKS.map((item) => (
            <NavLink
              key={`mobile-link-${item.label}`}
              item={item}
              pathname={pathname}
              mobile
              dark={isDarkRoute}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />
          ))}
          <NavLink item={LOGIN_ITEM} pathname={pathname} mobile dark={isDarkRoute} onNavigate={() => setIsMobileMenuOpen(false)} />
          <Link
            href={PRIMARY_CTA.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-3 mt-2 rounded-[4px] bg-[#FF2424] text-white font-archivo uppercase tracking-[1.5px] text-[12px] flex items-center justify-center"
          >
            {PRIMARY_CTA.label}
          </Link>
        </div>
      )}
    </header>
  );
}
