"use client";

import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { MarketingShell, PageHero } from "../components/marketing";
import { FadeIn } from "../components/home";

const inputClass =
  "w-full rounded-xl border border-[#111]/1 bg-white px-4 py-3 text-[14px] text-[#111] placeholder:text-[#9A9AA3] outline-none transition-colors focus:border-[#111]/3";

const labelClass =
  "mb-2 block text-[11px] font-semibold tracking-[0.14em] text-[#8A93A3] uppercase";

export default function BookPilotPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    contactNumber: "",
    teamSize: "",
    role: "",
    problem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!supabase) {
        alert(
          "Demo booking is not available in this environment. Please email briefing@jataka.ai."
        );
        return;
      }
      const { error } = await supabase.from("pilot_bookings").insert([
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
        name: "",
        email: "",
        company: "",
        contactNumber: "",
        teamSize: "",
        role: "",
        problem: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MarketingShell>
      <PageHero
        title="See the engine in"
        italicWord="action"
        subtitle="Get a tailored 20-minute technical deep-dive on your org — under NDA."
      />

      <section className="relative overflow-hidden bg-[#F3F3F4] px-6 pb-20 md:px-10 md:pb-28">
        <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[640px]">
          <FadeIn>
            {isSubmitted ? (
              <div className="rounded-[22px] border border-[#111]/08 bg-white px-8 py-14 text-center shadow-[0_16px_48px_rgba(17,17,17,0.05)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-2xl text-emerald-600">
                  ✓
                </div>
                <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-[-0.03em] text-[#111]">
                  Demo{" "}
                  <span className="font-instrument font-normal italic text-[#8A93A3]">scheduled</span>.
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#5F5F66]">
                  You&apos;ll hear from our technical team shortly with your pilot details.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[22px] border border-[#111]/08 bg-white p-6 shadow-[0_16px_48px_rgba(17,17,17,0.05)] md:p-8"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Work email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactNumber" className={labelClass}>
                      Contact number
                    </label>
                    <input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      required
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+1 …"
                    />
                  </div>
                  <div>
                    <label htmlFor="teamSize" className={labelClass}>
                      Team size
                    </label>
                    <div className="relative">
                      <select
                        id="teamSize"
                        name="teamSize"
                        required
                        value={formData.teamSize}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                      >
                        <option value="">Select size</option>
                        <option value="1-10">1-10</option>
                        <option value="10-50">10-50</option>
                        <option value="50-100">50-100</option>
                        <option value="100+">100+</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#9A9AA3]" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="role" className={labelClass}>
                      Role
                    </label>
                    <div className="relative">
                      <select
                        id="role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                      >
                        <option value="">Select role</option>
                        <option value="Salesforce Architect">Salesforce Architect</option>
                        <option value="Salesforce Developer">Salesforce Developer</option>
                        <option value="QA / Test Engineer">QA / Test Engineer</option>
                        <option value="Engineering Manager / VP">Engineering Manager / VP</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#9A9AA3]" />
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="problem" className={labelClass}>
                    What problem are you looking to solve?
                  </label>
                  <textarea
                    id="problem"
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="CI/CD, SOQL limits, test maintenance, blast radius…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-bloom mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111] px-6 py-3.5 text-[14px] font-medium text-white disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>Book a demo →</>
                  )}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </MarketingShell>
  );
}
