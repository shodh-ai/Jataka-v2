"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, Search, AlertTriangle, ArrowRight, FileQuestion, Zap, Shield, Clock, X, Menu } from "lucide-react";

// Error suggestions based on common patterns
const errorSuggestions = [
  {
    icon: FileQuestion,
    title: "Check URL",
    description: "Verify the URL is correct and hasn't been modified",
    action: "manual"
  },
  {
    icon: Clock,
    title: "Recent Changes",
    description: "This page may have been moved or updated recently",
    action: "navigate"
  },
  {
    icon: Zap,
    title: "Try Homepage",
    description: "Navigate to our main dashboard to find what you need",
    action: "home"
  },
  {
    icon: Shield,
    title: "Report Issue",
    description: "Help us improve by reporting broken links",
    action: "report"
  }
];

const popularDestinations = [
  { title: "Governor Limits", description: "Prevent runtime crashes", href: "/use-cases/limit-firewall" },
  { title: "PR Reviews", description: "Automated code analysis", href: "/use-cases/automated-pr-reviews" },
  { title: "UI Tests", description: "Self-healing test automation", href: "/use-cases/self-healing-ui-tests" },
  { title: "Anti-Patterns", description: "Common Salesforce issues", href: "/anti-patterns" },
  { title: "Documentation", description: "Technical guides and API reference", href: "https://docs.jataka.io" },
  { title: "Compare", description: "See how Jataka compares", href: "/compare" }
];

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Generate error ID for tracking
  const errorId = `404-${Date.now().toString(36).toUpperCase()}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search - in real app, this would search the site
      setTimeout(() => {
        window.open(`https://docs.jataka.io/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
        setIsSearching(false);
      }, 500);
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'manual':
        // Highlight URL bar
        const urlBar = document.querySelector('[data-url-bar]') as HTMLInputElement;
        if (urlBar) {
          urlBar.focus();
          urlBar.select();
        }
        break;
      case 'navigate':
        router.back();
        break;
      case 'home':
        router.push('/');
        break;
      case 'report':
        window.open('mailto:support@jataka.io?subject=Broken%20Link%20Report', '_blank');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[200] h-[64px] bg-[#FAF8F3]/90 backdrop-blur-[14px] border-b border-[#1a1a1a]/10 px-[24px] md:px-[48px] flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
          <svg className="h-[22px] w-auto block" viewBox="489.5 574 2305.4 484.92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M877.432 574C930.994 574 974.419 617.425 974.418 697.813 963.525 722.093 945.923 739.648C924.44 761.073 901.681 816.454C901.681 846.795 924.441 871.837C924.441 937.203 902.175 960.398 931.103 961.862L934.013 961.933C902.769 961.933 877.44 987.265 877.437 1018.51C877.435 987.266 852.105 961.933 820.862 961.933C852.106 961.931 877.437 905.358L877.508 908.275Z" fill="#1a1a1a"/>
            <path d="M877.508 908.275C878.976 937.203 902.175 960.398 931.103 961.862L934.013 961.933C902.769 961.933 877.44 987.265 877.437 1018.51C877.435 987.266 852.105 961.933 820.862 961.933C852.106 961.931 877.437 905.358L877.508 908.275Z" fill="#FF2424"/>
            <path d="M1292.08 685.6V907.648C1292.08 932.992 1285.03 952.72 1270.92 966.832C1257.09 980.944 1237.36 988 1211.73 988H1156V931.84H1191.86C1204.53 931.84 1213.6 928.96 1219.08 923.2C1224.55 917.152 1227.28 895.12V685.6H1292.08Z" fill="#1a1a1a"/>
            <path d="M1332.31 988L1442.9 685.6H1520.66L1630.39 988H1560.83L1537.51 921.904H1422.59L1399.27 988H1332.31ZM1439.87 869.632H1519.79L1479.62 754.72L1439.87 869.632Z" fill="#1a1a1a"/>
            <path d="M1621.19 685.6H1860.52V741.328H1773.26V988H1708.46V741.328H1621.19V685.6Z" fill="#1a1a1a"/>
            <path d="M1851.07 988L1961.66 685.6H2039.42L2149.15 988H2079.6L2056.27 921.904H1941.36L1918.03 988H1851.07ZM1958.64 869.632H2038.56L1998.38 754.72L1958.64 869.632Z" fill="#1a1a1a"/>
            <path d="M2199.4 686.032H2264.2V821.68L2385.16 686.032H2463.79L2352.76 810.448L2471.13 988H2393.37L2306.97 860.56L2264.2 908.512V988H2199.4V686.032Z" fill="#1a1a1a"/>
            <path d="M2496.82 988L2607.41 685.6H2685.17L2794.9 988H2725.35L2702.02 921.904H2587.11L2563.78 988H2496.82ZM2604.39 869.632H2684.31L2644.13 754.72L2604.39 869.632Z" fill="#1a1a1a"/>
          </svg>
        </div>
        
        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
          <li><button onClick={() => router.push("/")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Home</button></li>
          <li><button onClick={() => router.push("/use-cases")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</button></li>
          <li><button onClick={() => router.push("/docs")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Docs</button></li>
          <li><button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book Demo</button></li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-[#1a1a1a] p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-[24px] md:px-[48px] py-[80px]">
        <div className="max-w-[1000px] mx-auto text-center">
          {/* Error Icon with Animation */}
          <div className="flex justify-center mb-[40px]">
            <div className="relative">
              <div className="w-[120px] h-[120px] bg-[#FF2424]/10 rounded-full flex items-center justify-center relative">
                <AlertTriangle className="w-[48px] h-[48px] text-[#FF2424]" />
                <div className="absolute inset-0 rounded-full border-2 border-[#FF2424] animate-pulse"></div>
              </div>
              {/* Error Code Overlay */}
              <div className="absolute -top-[8px] -right-[8px] bg-[#1a1a1a] text-[10px] font-mono text-white px-[8px] py-[4px] rounded-[4px]">
                404
              </div>
            </div>
          </div>

          {/* Error Title */}
          <h1 className="font-archivo text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] uppercase text-[#1a1a1a] mb-[30px]">
            Page Not Found
          </h1>

          {/* Error Description */}
          <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[700px] mx-auto mb-[60px]">
            The page you're looking for doesn't exist or has been moved. 
            <strong className="text-[#1a1a1a] font-semibold">Even our runtime protection can't prevent broken links.</strong>
          </p>

          {/* Error ID */}
          <div className="inline-flex items-center gap-[8px] bg-[#1a1a1a]/5 px-[16px] py-[8px] rounded-[4px] mb-[60px]">
            <span className="text-[12px] font-mono text-[#666]">Error ID:</span>
            <span className="text-[12px] font-mono text-[#1a1a1a]">{errorId}</span>
          </div>

          {/* Requested URL */}
          <div className="bg-white rounded-[12px] p-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 mb-[40px]">
            <div className="text-[12px] font-mono text-[#666] mb-[8px]">REQUESTED URL:</div>
            <div 
              data-url-bar
              className="bg-[#FAF8F3] px-[12px] py-[8px] rounded-[4px] text-[14px] font-mono text-[#1a1a1a] break-all"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            >
              {window.location.href}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] mb-[60px]">
            {errorSuggestions.map((suggestion, index) => {
              const IconComponent = suggestion.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleAction(suggestion.action)}
                  className="bg-white p-[20px] rounded-[12px] border border-[#1a1a1a]/5 hover:border-[#FF2424]/30 hover:shadow-[0_8px_30px_rgba(255,36,36,0.12)] transition-all text-left group"
                >
                  <div className="w-[40px] h-[40px] bg-[#FAF8F3] rounded-[8px] flex items-center justify-center mb-[12px] group-hover:bg-[#FF2424]/10 transition-colors">
                    <IconComponent className="w-[20px] h-[20px] text-[#1a1a1a]" />
                  </div>
                  <h3 className="font-archivo text-[14px] uppercase tracking-[0.5px] text-[#1a1a1a] mb-[6px] group-hover:text-[#FF2424] transition-colors">
                    {suggestion.title}
                  </h3>
                  <p className="text-[13px] text-[#666] leading-[1.5]">
                    {suggestion.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-[12px] p-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 mb-[60px]">
            <form onSubmit={handleSearch}>
              <div className="flex gap-[12px]">
                <div className="flex-1 relative">
                  <Search className="absolute left-[12px] top-[50%] transform -translate-y-1/2 w-[20px] h-[20px] text-[#666]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documentation, use cases, or anti-patterns..."
                    className="w-full pl-[44px] pr-[16px] py-[12px] bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[6px] text-[14px] placeholder-[#666] focus:outline-none focus:border-[#FF2424]/30 focus:ring-2 focus:ring-[#FF2424]/10"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1px] rounded-[6px] hover:bg-[#d91f1f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
          </div>

          {/* Popular Destinations */}
          <div className="text-left max-w-[800px] mx-auto">
            <h2 className="font-archivo text-[20px] leading-[1.2] tracking-[-1px] uppercase text-[#1a1a1a] mb-[24px] text-center">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
              {popularDestinations.map((destination, index) => (
                <button
                  key={index}
                  onClick={() => destination.href.startsWith("http") 
                    ? window.open(destination.href, '_blank') 
                    : router.push(destination.href)
                  }
                  className="bg-white p-[20px] rounded-[12px] border border-[#1a1a1a]/5 hover:border-[#FF2424]/30 hover:shadow-[0_8px_30px_rgba(255,36,36,0.12)] transition-all text-left group"
                >
                  <h3 className="font-archivo text-[16px] uppercase tracking-[0.5px] text-[#1a1a1a] mb-[8px] group-hover:text-[#FF2424] transition-colors">
                    {destination.title}
                  </h3>
                  <p className="text-[14px] text-[#666] leading-[1.5]">
                    {destination.description}
                  </p>
                  <div className="flex items-center gap-[6px] mt-[12px] text-[#FF2424] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[12px] font-medium">Visit</span>
                    <ArrowRight className="w-[16px] h-[16px]" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Actions */}
          <div className="flex flex-col sm:flex-row gap-[16px] justify-center items-center mt-[60px]">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-[8px] bg-[#FF2424] text-white px-[24px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[6px] hover:bg-[#d91f1f] transition-colors"
            >
              <Home className="w-[16px] h-[16px]" />
              Back to Homepage
            </button>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-[8px] bg-white text-[#1a1a1a] px-[24px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[6px] border border-[#1a1a1a]/20 hover:bg-[#1a1a1a]/5 transition-colors"
            >
              <ArrowRight className="w-[16px] h-[16px] rotate-180" />
              Previous Page
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-[40px] px-[24px] md:px-[48px] mt-auto">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[14px] text-[#888] mb-[8px]">
            2024 Jataka. Runtime Governance Engine for Salesforce.
          </p>
          <p className="text-[12px] text-[#666]">
            Error ID: {errorId} | Status: Page Not Found
          </p>
        </div>
      </footer>
    </div>
  );
}
