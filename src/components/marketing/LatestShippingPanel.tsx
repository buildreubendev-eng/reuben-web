import Link from "next/link";
import { Activity, ArrowUpRight, CheckCircle2, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type ShipTone = "emerald" | "cyan" | "violet";

interface ShipItem {
  product: string;
  status: string;
  title: string;
  description: string;
  proof: string[];
  href: string;
  cta: string;
  tone: ShipTone;
}

const toneClasses: Record<ShipTone, string> = {
  emerald: "border-emerald-500/20 bg-emerald-500/[0.05] text-emerald-200",
  cyan: "border-cyan-500/20 bg-cyan-500/[0.05] text-cyan-200",
  violet: "border-violet-500/20 bg-violet-500/[0.05] text-violet-200",
};

const iconClasses: Record<ShipTone, string> = {
  emerald: "text-emerald-300",
  cyan: "text-cyan-300",
  violet: "text-violet-300",
};

const shippedItems: ShipItem[] = [
  {
    product: "Business Simulator",
    status: "Live product wedge",
    title: "Public scenario planning is ready to demo.",
    description: "Visitors can open the simulator, run a decision model, review results, compare scenarios, and submit a Founder Pilot intake without a login.",
    proof: ["Saved run links", "Scenario comparison", "Founder Pilot intake"],
    href: "/simulator",
    cta: "Open simulator",
    tone: "emerald",
  },
  {
    product: "Reux",
    status: "Prototype complete",
    title: "The backend engine has live model proof.",
    description: "The website now verifies the Railway backend, checks the executable model catalog, and shows latency directly on the status page.",
    proof: ["5 expected models", "Live health route", "Developer docs"],
    href: "/status",
    cta: "View live status",
    tone: "cyan",
  },
  {
    product: "PLOS",
    status: "MVP foundation",
    title: "The LifePilot codename is now positioned as PLOS.",
    description: "The public story frames PLOS as the Personal Life Operating System with life-admin inbox, task, approval, document, and privacy surfaces.",
    proof: ["Backend routes", "Gemini UI handoff", "Privacy approvals"],
    href: "/projects/plos",
    cta: "Review PLOS",
    tone: "violet",
  },
];

const platformProof = [
  "Crawler-ready sitemap and robots routes",
  "Smoke-tested public routes for Reux, PLOS, Business Simulator, docs, and status",
  "Live Reux status telemetry exposed through the website API",
];

export default function LatestShippingPanel() {
  return (
    <section className="relative z-20 border-b border-white/5 bg-[#0A0A0A]/30 py-20 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-300">
              <Sparkles className="h-3.5 w-3.5 text-[#00F0FF]" />
              Latest shipped
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              What is real in the Reuben stack right now
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">
              The homepage now points to working proof instead of future-tense product language: a live simulator, a verified Reux backend, and a PLOS MVP foundation.
            </p>
          </div>

          <Link
            href="/status"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-500/30 hover:bg-cyan-500/[0.08]"
          >
            Full ecosystem status
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {shippedItems.map((item) => (
            <Link
              key={item.product}
              href={item.href}
              className="group flex min-h-[340px] flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{item.product}</p>
                  <span className={cn("mt-2 inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider", toneClasses[item.tone])}>
                    {item.status}
                  </span>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                  <Activity className={cn("h-5 w-5", iconClasses[item.tone])} />
                </div>
              </div>

              <h3 className="text-xl font-bold leading-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{item.description}</p>

              <div className="mt-6 grid gap-2">
                {item.proof.map((proof) => (
                  <div key={proof} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className={cn("h-4 w-4 shrink-0", iconClasses[item.tone])} />
                    <span>{proof}</span>
                  </div>
                ))}
              </div>

              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-white transition-colors group-hover:text-[#00F0FF]">
                {item.cta}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-5 grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-5 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
            <Layers3 className="h-5 w-5 text-emerald-300" />
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-base font-bold text-white">Production proof layer</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                The public site now has operational hooks for discovery, health, and verification.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {platformProof.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
