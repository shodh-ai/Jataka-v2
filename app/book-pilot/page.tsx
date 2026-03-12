"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; 

export default function BookPilotPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    contactNumber: "",
    teamSize: "",
    role: "",
    problem: ""
  });

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu
    if (sectionId === "hero" || sectionId === "problem" || sectionId === "features" || sectionId === "pipeline" || sectionId === "brain") {
      sessionStorage.setItem("targetSection", sectionId);
      router.push("/");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('pilot_bookings')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            contact_number: formData.contactNumber,
            team_size: formData.teamSize,
            role: formData.role,
            problem: formData.problem,
          },
        ]);

      if (error) throw error;
      setIsSubmitted(true);
      setFormData({
        name: "", email: "", company: "", contactNumber: "", 
        teamSize: "", role: "", problem: ""
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[4px] focus:outline-none focus:border-[var(--text-dim)] transition-colors text-[var(--text)] text-base md:text-sm placeholder-[var(--text-muted)]";

  return (
    <>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-[200] h-[64px] bg-[rgba(6,12,22,0.88)] backdrop-blur-[14px] border-b border-[rgba(255,255,255,0.06)] px-[24px] md:px-[48px] flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("hero")}>
          <svg className="h-[22px] w-auto block" viewBox="489.5 574 2305.4 484.92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M877.432 574C930.994 574 974.419 617.425 974.419 670.987C974.418 697.813 963.525 722.093 945.923 739.648C924.44 761.073 901.681 786.114 901.681 816.454C901.681 846.795 924.441 871.837 945.923 893.264C963.526 910.822 974.418 935.105 974.419 961.932C974.419 1015.49 930.994 1058.92 877.432 1058.92C850.604 1058.92 826.319 1048.02 808.76 1030.42C787.337 1008.94 762.298 986.181 731.959 986.181C701.621 986.181 676.582 1008.94 655.159 1030.42C637.6 1048.02 613.315 1058.92 586.487 1058.92C532.925 1058.92 489.5 1015.49 489.5 961.932C489.502 908.371 532.926 864.953 586.487 864.953C613.316 864.954 637.601 875.848 655.159 893.453C676.582 914.934 701.622 937.691 731.959 937.691C762.297 937.691 787.402 914.81 808.854 893.357C830.307 871.902 853.191 846.795 853.191 816.454C853.191 786.114 830.432 761.074 808.949 739.649C791.346 722.093 780.454 697.813 780.453 670.987C780.453 617.426 823.871 574.002 877.432 574Z" fill="#E8E4DC"/>
            <path d="M877.508 908.275C878.976 937.203 902.175 960.398 931.103 961.862L934.013 961.933C902.769 961.933 877.44 987.265 877.437 1018.51C877.435 987.266 852.105 961.933 820.862 961.933C852.106 961.931 877.437 936.601 877.437 905.358L877.508 908.275Z" fill="#FF2424"/>
            <path d="M1292.08 685.6V907.648C1292.08 932.992 1285.03 952.72 1270.92 966.832C1257.09 980.944 1237.36 988 1211.73 988H1156V931.84H1191.86C1204.53 931.84 1213.6 928.96 1219.08 923.2C1224.55 917.152 1227.28 907.792 1227.28 895.12V685.6H1292.08Z" fill="#E8E4DC"/>
            <path d="M1332.31 988L1442.9 685.6H1520.66L1630.39 988H1560.83L1537.51 921.904H1422.59L1399.27 988H1332.31ZM1439.87 869.632H1519.79L1479.62 754.72L1439.87 869.632Z" fill="#E8E4DC"/>
            <path d="M1621.19 685.6H1860.52V741.328H1773.26V988H1708.46V741.328H1621.19V685.6Z" fill="#E8E4DC"/>
            <path d="M1851.07 988L1961.66 685.6H2039.42L2149.15 988H2079.6L2056.27 921.904H1941.36L1918.03 988H1851.07ZM1958.64 869.632H2038.56L1998.38 754.72L1958.64 869.632Z" fill="#E8E4DC"/>
            <path d="M2199.4 686.032H2264.2V821.68L2385.16 686.032H2463.79L2352.76 810.448L2471.13 988H2393.37L2306.97 860.56L2264.2 908.512V988H2199.4V686.032Z" fill="#E8E4DC"/>
            <path d="M2496.82 988L2607.41 685.6H2685.17L2794.9 988H2725.35L2702.02 921.904H2587.11L2563.78 988H2496.82ZM2604.39 869.632H2684.31L2644.13 754.72L2604.39 869.632Z" fill="#E8E4DC"/>
          </svg>
        </div>
        
        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
          <li><button onClick={() => scrollToSection("problem")} className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Problem</button></li>
          <li><button onClick={() => scrollToSection("features")} className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Features</button></li>
          <li><button onClick={() => scrollToSection("pipeline")} className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors text-[13.5px] font-medium tracking-[0.4px]">How It Works</button></li>
          <li><button onClick={() => scrollToSection("brain")} className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors text-[13.5px] font-medium tracking-[0.4px]">DevTools</button></li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-[64px] left-0 w-full bg-[var(--bg-surface)] border-b border-[var(--border)] p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-in slide-in-from-top-2 z-[190]">
            <button onClick={() => scrollToSection("problem")} className="text-left text-lg font-medium text-[var(--text)] py-2 border-b border-[var(--border)]">Problem</button>
            <button onClick={() => scrollToSection("features")} className="text-left text-lg font-medium text-[var(--text)] py-2 border-b border-[var(--border)]">Features</button>
            <button onClick={() => scrollToSection("pipeline")} className="text-left text-lg font-medium text-[var(--text)] py-2 border-b border-[var(--border)]">How It Works</button>
            <button onClick={() => scrollToSection("brain")} className="text-left text-lg font-medium text-[var(--text)] py-2 border-b border-[var(--border)]">DevTools</button>
          </div>
        )}
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="min-h-screen pt-[120px] pb-[80px] px-[24px] relative overflow-hidden flex justify-center items-center">
        <div className="grid-bg"></div>

        <div className="w-full max-w-[800px] relative z-10 flex flex-col items-center">
          
          {/* Form Header */}
          {!isSubmitted && (
            <div className="flex flex-col items-center text-center mb-[48px] max-w-[600px]">
              <div className="inline-flex items-center gap-[9px] bg-[var(--accent-red-dim)] border border-[rgba(255,36,36,0.28)] px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] color-[var(--accent-red)] text-[#FF2424]">
                <span className="text-[8px]">▶</span> Book A Demo
              </div>
              <h1 className="font-archivo text-[clamp(32px,5vw,48px)] leading-[0.93] tracking-[-2px] uppercase mb-[24px]">
                <span className="cut-white block mb-[4px]">See the Execution</span>
                <span className="cut-white block mb-[4px]">Engine in Action</span>
              </h1>
              <p className="text-[16px] text-[var(--text-dim)] max-w-[480px] leading-[1.65]">
                Get a tailored 20-minute technical deep-dive. 
              </p>
            </div>
          )}

          {isSubmitted ? (
            <div className="w-full max-w-[533px] bg-[var(--bg-card)] border border-[var(--border)] p-[40px] md:p-[60px] flex items-center justify-center rounded-[4px]">
              <div className="flex flex-col items-center text-center gap-[36px] w-full">
                <div className="w-[84px] h-[84px] rounded-full bg-[rgba(126,231,135,0.1)] flex items-center justify-center border border-[#7EE787]">
                  <span className="text-[40px] text-[#7EE787]">✓</span>
                </div>
                <div className="space-y-[12px]">
                  <h2 className="font-archivo text-[32px] md:text-[40px] uppercase tracking-[-1px] text-[var(--text)] leading-tight">
                    Demo Scheduled.
                  </h2>
                  <p className="text-[15px] text-[var(--text-dim)] max-w-md mx-auto leading-[1.6]">
                    You’ll hear from our technical team shortly with your pilot details.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-[var(--bg-card)] border border-[var(--border)] p-[32px] md:p-[48px] rounded-[4px]">
              <form onSubmit={handleSubmit} className="space-y-[24px]">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <div>
                    <label htmlFor="name" className="block text-[13px] font-bold tracking-[1px] uppercase text-[var(--text-muted)] mb-[10px]">Name</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[13px] font-bold tracking-[1px] uppercase text-[var(--text-muted)] mb-[10px]">Work Email</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="you@company.com" />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <div>
                    <label htmlFor="company" className="block text-[13px] font-bold tracking-[1px] uppercase text-[var(--text-muted)] mb-[10px]">Company Name</label>
                    <input type="text" id="company" name="company" required value={formData.company} onChange={handleChange} className={inputClasses} placeholder="Your company" />
                  </div>
                  <div>
                    <label htmlFor="contactNumber" className="block text-[13px] font-bold tracking-[1px] uppercase text-[var(--text-muted)] mb-[10px]">Contact Number</label>
                    <input type="tel" id="contactNumber" name="contactNumber" required value={formData.contactNumber} onChange={handleChange} className={inputClasses} placeholder="Contact number" />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <div>
                    <label htmlFor="teamSize" className="block text-[13px] font-bold tracking-[1px] uppercase text-[var(--text-muted)] mb-[10px]">Team Size</label>
                    <div className="relative">
                      <select id="teamSize" name="teamSize" required value={formData.teamSize} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                        <option value="" className="bg-[var(--bg-surface)]">Select Size</option>
                        <option value="1-10" className="bg-[var(--bg-surface)]">1-10</option>
                        <option value="10-50" className="bg-[var(--bg-surface)]">10-50</option>
                        <option value="50-100" className="bg-[var(--bg-surface)]">50-100</option>
                        <option value="100+" className="bg-[var(--bg-surface)]">100+</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[var(--text-muted)] pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-[13px] font-bold tracking-[1px] uppercase text-[var(--text-muted)] mb-[10px]">Role/Position</label>
                    <div className="relative">
                      <select id="role" name="role" required value={formData.role} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                        <option value="" className="bg-[var(--bg-surface)]">Select Role</option>
                        <option value="Salesforce Architect" className="bg-[var(--bg-surface)]">Salesforce Architect</option>
                        <option value="Salesforce Developer" className="bg-[var(--bg-surface)]">Salesforce Developer</option>
                        <option value="QA / Test Engineer" className="bg-[var(--bg-surface)]">QA / Test Engineer</option>
                        <option value="Engineering Manager / VP" className="bg-[var(--bg-surface)]">Engineering Manager / VP</option>
                        <option value="Other" className="bg-[var(--bg-surface)]">Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[var(--text-muted)] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 4 */}
                <div>
                  <label htmlFor="problem" className="block text-[13px] font-bold tracking-[1px] uppercase text-[var(--text-muted)] mb-[10px]">What Problem Are You Looking to Solve?</label>
                  <textarea id="problem" name="problem" value={formData.problem} onChange={handleChange} rows={4} className={`${inputClasses} resize-none h-[120px]`} placeholder="Tell us about your CI/CD setup, SOQL limit issues, or scaling challenges..." />
                </div>

                {/* Submit Button */}
                <div className="pt-[16px]">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed rounded-[4px] py-[20px] text-[16px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-[18px] w-[18px]" />
                        SUBMITTING...
                      </>
                    ) : (
                      "BOOK A DEMO"
                    )}
                  </button>
                </div>

              </form>
            </div>
          )}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[var(--bg)] border-t border-[var(--border)] px-[24px] md:px-[48px] py-[40px] flex flex-col md:flex-row items-center justify-between gap-[20px]">
        <div className="flex items-center gap-[14px]">
          <svg className="h-[19px] w-auto" viewBox="489.5 574 2305.4 484.92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M877.432 574C930.994 574 974.419 617.425 974.419 670.987C974.418 697.813 963.525 722.093 945.923 739.648C924.44 761.073 901.681 786.114 901.681 816.454C901.681 846.795 924.441 871.837 945.923 893.264C963.526 910.822 974.418 935.105 974.419 961.932C974.419 1015.49 930.994 1058.92 877.432 1058.92C850.604 1058.92 826.319 1048.02 808.76 1030.42C787.337 1008.94 762.298 986.181 731.959 986.181C701.621 986.181 676.582 1008.94 655.159 1030.42C637.6 1048.02 613.315 1058.92 586.487 1058.92C532.925 1058.92 489.5 1015.49 489.5 961.932C489.502 908.371 532.926 864.953 586.487 864.953C613.316 864.954 637.601 875.848 655.159 893.453C676.582 914.934 701.622 937.691 731.959 937.691C762.297 937.691 787.402 914.81 808.854 893.357C830.307 871.902 853.191 846.795 853.191 816.454C853.191 786.114 830.432 761.074 808.949 739.649C791.346 722.093 780.454 697.813 780.453 670.987C780.453 617.426 823.871 574.002 877.432 574Z" fill="#3A4F6A"/>
            <path d="M1292.08 685.6V907.648C1292.08 932.992 1285.03 952.72 1270.92 966.832C1257.09 980.944 1237.36 988 1211.73 988H1156V931.84H1191.86C1204.53 931.84 1213.6 928.96 1219.08 923.2C1224.55 917.152 1227.28 907.792 1227.28 895.12V685.6H1292.08Z" fill="#3A4F6A"/>
            <path d="M1332.31 988L1442.9 685.6H1520.66L1630.39 988H1560.83L1537.51 921.904H1422.59L1399.27 988H1332.31ZM1439.87 869.632H1519.79L1479.62 754.72L1439.87 869.632Z" fill="#3A4F6A"/>
            <path d="M1621.19 685.6H1860.52V741.328H1773.26V988H1708.46V741.328H1621.19V685.6Z" fill="#3A4F6A"/>
            <path d="M1851.07 988L1961.66 685.6H2039.42L2149.15 988H2079.6L2056.27 921.904H1941.36L1918.03 988H1851.07ZM1958.64 869.632H2038.56L1998.38 754.72L1958.64 869.632Z" fill="#3A4F6A"/>
            <path d="M2199.4 686.032H2264.2V821.68L2385.16 686.032H2463.79L2352.76 810.448L2471.13 988H2393.37L2306.97 860.56L2264.2 908.512V988H2199.4V686.032Z" fill="#3A4F6A"/>
            <path d="M2496.82 988L2607.41 685.6H2685.17L2794.9 988H2725.35L2702.02 921.904H2587.11L2563.78 988H2496.82ZM2604.39 869.632H2684.31L2644.13 754.72L2604.39 869.632Z" fill="#3A4F6A"/>
          </svg>
          <div className="font-archivo text-[11px] uppercase tracking-[2px] text-[var(--text-muted)]">jataka.shodh.ai</div>
        </div>
        <div className="text-[13px] text-[var(--text-muted)] text-center md:text-right">
          2025 Jataka · Runtime Governance for Salesforce · All rights reserved.
        </div>
      </footer>
    </>
  );
}