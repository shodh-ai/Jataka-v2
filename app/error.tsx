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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[40px] items-stretch">
            {recoveryOptions.map((option, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleAction(option.action)}
                  className="bg-white p-[20px] rounded-[8px] border border-[#1a1a1a]/10 hover:border-[#FF2424]/30 hover:shadow-[0_4px_20px_rgba(255,36,36,0.12)] transition-all text-left group h-full min-h-0 flex flex-col"
                >
                  <div className="flex items-start gap-[12px] flex-1">
                    <div className="w-[40px] h-[40px] bg-[#FAF8F3] rounded-[8px] flex items-center justify-center group-hover:bg-[#FF2424]/10 transition-colors flex-shrink-0">
                      {option.action === "refresh" && <RefreshCw className={`w-[20px] h-[20px] text-[#1a1a1a] ${isRetrying ? "animate-spin" : ""}`} />}
                      {option.action === "cache" && <Wrench className="w-[20px] h-[20px] text-[#1a1a1a]" />}
                      {option.action === "status" && <Activity className="w-[20px] h-[20px] text-[#1a1a1a]" />}
                      {option.action === "browser" && <Database className="w-[20px] h-[20px] text-[#1a1a1a]" />}
                      {option.action === "support" && <AlertTriangle className="w-[20px] h-[20px] text-[#FF2424]" />}
                      {option.action === "auth" && <Shield className="w-[20px] h-[20px] text-[#1a1a1a]" />}
                    </div>
                    <div className="flex-1 min-w-0">
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
