"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, RefreshCw, AlertTriangle, ArrowRight, Zap, Database, Shield, Clock, FileQuestion, Wrench, Activity, X, Menu } from "lucide-react";

// Error types based on HTTP status codes
const errorTypes: Record<number, { title: string; description: string; icon: typeof AlertTriangle; color: string }> = {
  400: {
    title: "Bad Request",
    description: "The server couldn't understand your request. Please check your input and try again.",
    icon: AlertTriangle,
    color: "text-orange-600"
  },
  401: {
    title: "Unauthorized",
    description: "You don't have permission to access this resource. Please authenticate and try again.",
    icon: Shield,
    color: "text-red-600"
  },
  403: {
    title: "Forbidden",
    description: "Access to this resource is denied. This might be a configuration issue.",
    icon: Shield,
    color: "text-red-600"
  },
  404: {
    title: "Not Found",
    description: "The resource you're looking for doesn't exist or has been moved.",
    icon: FileQuestion,
    color: "text-blue-600"
  },
  500: {
    title: "Internal Server Error",
    description: "Something went wrong on our servers. Our team has been notified.",
    icon: Database,
    color: "text-red-600"
  },
  502: {
    title: "Service Unavailable",
    description: "Our systems are temporarily down for maintenance. We'll be back shortly.",
    icon: Clock,
    color: "text-orange-600"
  },
  503: {
    title: "Service Unavailable",
    description: "Our servers are experiencing high load. We're scaling up resources.",
    icon: Zap,
    color: "text-orange-600"
  }
};

interface RecoveryOption {
  title: string;
  description: string;
  action: string;
}

const getRecoveryOptions = (errorCode: number): RecoveryOption[] => {
  const commonOptions: RecoveryOption[] = [
    { title: "Refresh Page", description: "Try loading page again", action: "refresh" },
    { title: "Clear Cache", description: "Clear browser cache and cookies", action: "cache" },
    { title: "Check Status", description: "View system status page", action: "status" },
    { title: "Try Different Browser", description: "Chrome, Firefox, or Safari", action: "browser" }
  ];

  if (errorCode === 401 || errorCode === 403) {
    commonOptions.push({ title: "Check Authentication", description: "Verify your login credentials", action: "auth" });
  }

  if (errorCode >= 500) {
    commonOptions.push({ title: "Contact Support", description: "Get help from our team", action: "support" });
  }

  return commonOptions;
};

interface StatusItem {
  icon: typeof Database;
  title: string;
  description: string;
  status: string;
  statusColor: string;
}

const getSystemStatus = (errorCode: number): StatusItem[] => {
  const statusItems: StatusItem[] = [
    {
      icon: Database,
      title: "Database Connection",
      description: "Our systems are having trouble connecting to database.",
      status: errorCode >= 500 ? "Error" : "Checking...",
      statusColor: errorCode >= 500 ? "text-red-600" : "text-green-600"
    },
    {
      icon: Zap,
      title: "API Services",
      description: "Some of our microservices are experiencing high load.",
      status: errorCode >= 500 ? "Scaling..." : "Operational",
      statusColor: errorCode >= 500 ? "text-orange-600" : "text-green-600"
    },
    {
      icon: Shield,
      title: "Security Layer",
      description: "Our security systems are performing additional checks.",
      status: "Verified",
      statusColor: "text-green-600"
    }
  ];

  if (errorCode >= 500) {
    statusItems.push({
      icon: Activity,
      title: "Error Recovery",
      description: "Automatic recovery systems have been activated",
      status: "Active",
      statusColor: "text-orange-600"
    });
  }

  return statusItems;
};

export default function ServerError({ error, reset }: { error?: Error; reset?: () => void }) {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get error code from error object or default to 500
  const errorCode = 500;
  const errorInfo = errorTypes[errorCode] || errorTypes[500];

  // Generate error ID for tracking
  const errorId = `ERR-${errorCode}-${Date.now().toString(36).toUpperCase()}`;

  const recoveryOptions = getRecoveryOptions(errorCode);
  const systemStatus = getSystemStatus(errorCode);

  const handleAction = (action: string) => {
    switch (action) {
      case "refresh":
        setIsRetrying(true);
        setTimeout(() => {
          if (reset) {
            reset();
          } else {
            window.location.reload();
          }
          setIsRetrying(false);
        }, 1000);
        break;
      case "cache":
        if ("caches" in window) {
          caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
          }).then(() => {
            alert("Cache cleared successfully. Please refresh the page.");
          });
        } else {
          alert("Please clear your browser cache manually (Ctrl+Shift+Delete or Cmd+Shift+Delete) and refresh.");
        }
        break;
      case "browser":
        alert("Try accessing this page in a different browser (Chrome, Firefox, or Safari).");
        break;
      case "status":
        window.open("https://status.jataka.io", "_blank");
        break;
      case "auth":
        router.push("/login");
        break;
      case "support":
        window.open("mailto:support@jataka.io?subject=Error%20Report", "_blank");
        break;
      default:
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

        {/* Mobile Menu Button */}
        <button className="md:hidden p-[8px]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[64px] left-0 right-0 z-[150] bg-[#FAF8F3] border-b border-[#1a1a1a]/10 md:hidden">
          <div className="px-[24px] py-[20px] flex flex-col gap-[16px]">
            <button onClick={() => router.push("/")} className="text-[#666] text-[14px] font-medium">Home</button>
            <button onClick={() => router.push("/use-cases")} className="text-[#666] text-[14px] font-medium">Use Cases</button>
            <button onClick={() => router.push("/docs")} className="text-[#666] text-[14px] font-medium">Docs</button>
            <button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px]">Book Demo</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-[24px] md:px-[48px] py-[80px] pt-[120px]">
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
                {errorCode}
              </div>
            </div>
          </div>

          {/* Error Title */}
          <h1 className={`font-archivo text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] uppercase mb-[30px] ${errorInfo.color}`}>
            {errorInfo.title}
          </h1>

          {/* Error Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[40px]">
            <div className="bg-white rounded-[12px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5">
              <p className="text-[clamp(16px,1.5vw,18px)] leading-[1.7] text-[#444] mb-[20px]">
                {errorInfo.description}
                {errorCode >= 500 && (
                  <span className="block mt-[12px] text-[14px] text-[#666]">
                    <strong className="text-[#1a1a1a] font-semibold">Error ID:</strong> {errorId}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-[12px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/10 mb-[40px]">
            <h2 className="font-archivo text-[20px] leading-[1.2] tracking-[-1px] uppercase text-[#1a1a1a] mb-[24px]">
              System Status
            </h2>
            <div className="space-y-[20px]">
              {systemStatus.map((status, index) => {
                const IconComponent = status.icon;
                return (
                  <div key={index} className="flex items-start gap-[16px] p-[16px] bg-[#FAF8F3] rounded-[8px]">
                    <div className="w-[40px] h-[40px] bg-white rounded-[8px] flex items-center justify-center flex-shrink-0">
                      <IconComponent className={`w-[20px] h-[20px] ${status.statusColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-[4px]">
                        <h3 className="font-archivo text-[14px] uppercase tracking-[1px] text-[#1a1a1a]">
                          {status.title}
                        </h3>
                        <span className={`text-[12px] font-mono px-[8px] py-[4px] rounded-[4px] ${
                          status.statusColor === "text-green-600"
                            ? "bg-[#10B981]/10 text-[#10B981]"
                            : status.statusColor === "text-orange-600"
                            ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                            : "bg-[#FF2424]/10 text-[#FF2424]"
                        }`}>
                          {status.status}
                        </span>
                      </div>
                      <p className="text-[14px] text-[#666] leading-[1.5]">
                        {status.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recovery Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[40px]">
            {recoveryOptions.map((option, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleAction(option.action)}
                  className="bg-white p-[20px] rounded-[8px] border border-[#1a1a1a]/10 hover:border-[#FF2424]/30 hover:shadow-[0_4px_20px_rgba(255,36,36,0.12)] transition-all text-left group"
                >
                  <div className="flex items-center gap-[12px] mb-[8px]">
                    <div className="w-[40px] h-[40px] bg-[#FAF8F3] rounded-[8px] flex items-center justify-center group-hover:bg-[#FF2424]/10 transition-colors">
                      {option.action === "refresh" && <RefreshCw className={`w-[20px] h-[20px] text-[#1a1a1a] ${isRetrying ? "animate-spin" : ""}`} />}
                      {option.action === "cache" && <Wrench className="w-[20px] h-[20px] text-[#1a1a1a]" />}
                      {option.action === "status" && <Activity className="w-[20px] h-[20px] text-[#1a1a1a]" />}
                      {option.action === "browser" && <Database className="w-[20px] h-[20px] text-[#1a1a1a]" />}
                      {option.action === "support" && <AlertTriangle className="w-[20px] h-[20px] text-[#FF2424]" />}
                      {option.action === "auth" && <Shield className="w-[20px] h-[20px] text-[#1a1a1a]" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-archivo text-[14px] uppercase tracking-[1px] text-[#1a1a1a] mb-[8px] group-hover:text-[#FF2424] transition-colors">
                        {option.title}
                      </h3>
                      <p className="text-[14px] text-[#666] leading-[1.5]">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-[16px] justify-center items-center">
            <button
              onClick={() => handleAction("refresh")}
              disabled={isRetrying}
              className="flex items-center gap-[8px] bg-[#FF2424] text-white px-[24px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-[16px] h-[16px] ${isRetrying ? "animate-spin" : ""}`} />
              {errorCode >= 500 ? "Retry Request" : "Try Again"}
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-[8px] bg-white text-[#1a1a1a] px-[24px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px] border border-[#1a1a1a]/20 hover:bg-[#1a1a1a]/5 transition-colors"
            >
              <Home className="w-[16px] h-[16px]" />
              Go Home
            </button>
          </div>

          {/* Support Contact */}
          <div className="mt-[60px] text-center">
            <p className="text-[14px] text-[#666] mb-[16px]">
              Still experiencing issues? Our support team is here to help.
            </p>
            <button
              onClick={() => handleAction("support")}
              className="flex items-center gap-[8px] mx-auto bg-[#1a1a1a]/5 px-[20px] py-[10px] rounded-[4px] hover:bg-[#1a1a1a]/10 transition-colors"
            >
              <span className="text-[14px] text-[#1a1a1a]">Contact Support</span>
              <ArrowRight className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-[40px] px-[24px] md:px-[48px] mt-auto">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[14px] text-[#888] mb-[8px]">
            © 2024 Jataka. Runtime Governance Engine for Salesforce.
          </p>
          <p className="text-[12px] text-[#666]">
            Error ID: {errorId} | Status: {errorInfo.title}
          </p>
        </div>
      </footer>
    </div>
  );
}
