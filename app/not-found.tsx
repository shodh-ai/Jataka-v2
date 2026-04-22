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
  const [errorId, setErrorId] = useState("404-LOADING");

  // Generate error ID for tracking only on client-side to prevent hydration mismatch
  useEffect(() => {
    setErrorId(`404-${Date.now().toString(36).toUpperCase()}`);
  }, []);

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
              onClick={() => {
                if (typeof window !== 'undefined') {
                  navigator.clipboard.writeText(window.location.href)
                }
              }}
            >
              {typeof window !== 'undefined' ? window.location.href : ''}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] mb-[60px] items-stretch">
            {errorSuggestions.map((suggestion, index) => {
              const IconComponent = suggestion.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleAction(suggestion.action)}
                  className="bg-white p-[20px] rounded-[12px] border border-[#1a1a1a]/5 hover:border-[#FF2424]/30 hover:shadow-[0_8px_30px_rgba(255,36,36,0.12)] transition-all text-left group h-full min-h-0 flex flex-col"
                >
                  <div className="w-[40px] h-[40px] bg-[#FAF8F3] rounded-[8px] flex items-center justify-center mb-[12px] group-hover:bg-[#FF2424]/10 transition-colors">
                    <IconComponent className="w-[20px] h-[20px] text-[#1a1a1a]" />
                  </div>
                  <h3 className="font-archivo text-[14px] uppercase tracking-[0.5px] text-[#1a1a1a] mb-[6px] group-hover:text-[#FF2424] transition-colors">
                    {suggestion.title}
                  </h3>
                  <p className="text-[13px] text-[#666] leading-[1.5] flex-1">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] items-stretch">
              {popularDestinations.map((destination, index) => (
                <button
                  key={index}
                  onClick={() => destination.href.startsWith("http") 
                    ? window.open(destination.href, '_blank') 
                    : router.push(destination.href)
                  }
                  className="bg-white p-[20px] rounded-[12px] border border-[#1a1a1a]/5 hover:border-[#FF2424]/30 hover:shadow-[0_8px_30px_rgba(255,36,36,0.12)] transition-all text-left group h-full min-h-0 flex flex-col"
                >
                  <h3 className="font-archivo text-[16px] uppercase tracking-[0.5px] text-[#1a1a1a] mb-[8px] group-hover:text-[#FF2424] transition-colors">
                    {destination.title}
                  </h3>
                  <p className="text-[14px] text-[#666] leading-[1.5] flex-1">
                    {destination.description}
                  </p>
                  <div className="flex items-center gap-[6px] mt-auto pt-[12px] text-[#FF2424] opacity-0 group-hover:opacity-100 transition-opacity">
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
