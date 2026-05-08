import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Database,
  GitBranch,
  Inbox,
  LockKeyhole,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import EcosystemStatusStrip from "@/components/marketing/EcosystemStatusStrip";
import LiveSystemStatus from "@/components/marketing/LiveSystemStatus";

export const metadata: Metadata = {
  title: "Reuben Status | Reux, Business Simulator, and PLOS",
  description:
    "Current Reuben ecosystem status for Reux, Business Simulator, and PLOS, including what is live, what is MVP, and what is next.",
};

const productStatus = [
  {
    name: "Reux",
    status: "Prototype complete",
    tone: "cyan",
    icon: BrainCircuit,
    summary:
      "Data-aware backend language for schemas, typed queries, transactions, events, migrations, simulations, generated TypeScript, and public demo execution.",
    live: [
      "Compiler, CLI, migration planning, seed checks, and release preflight",
      "PostgreSQL query and transaction execution with outbox processing",
      "Simulation declarations for PLOS, workforce, operations, and finance examples",
      "VS Code syntax highlighting, diagnostics, formatting, completions, hover, and definitions",
    ],
    links: [
      { label: "Product page", href: "/projects/reux" },
      { label: "Developer preview", href: "/docs" },
      { label: "Roadmap", href: "/projects/reux/roadmap" },
      { label: "GitHub", href: "https://github.com/buildreubendev-eng/Reux", external: true },
    ],
  },
  {
    name: "Business Simulator",
    status: "Live sellable wedge",
    tone: "emerald",
    icon: BarChart3,
    summary:
      "Guided operational scenario planning product for teams comparing staffing, pricing, capacity, risk, margin, and process decisions before committing resources.",
    live: [
      "Public simulator dashboard, scenario builder, results, and comparison views",
      "Operations, capacity, staffing, and pricing templates",
      "Recommendation panel, watchouts, score breakdowns, saved runs, and temporary share links",
      "Founder Pilot intake flow connected to the live Reux backend when configured",
    ],
    links: [
      { label: "Open simulator", href: "/simulator" },
      { label: "Guided demo", href: "/simulator/new?preset=optimization" },
      { label: "Founder Pilot", href: "/founder-pilot" },
      { label: "Demo runbook", href: "/docs#business-simulator-guide" },
    ],
  },
  {
    name: "PLOS",
    status: "MVP foundation",
    tone: "violet",
    icon: Inbox,
    summary:
      "Personal Life Operating System MVP for turning life-admin messages into prioritized actions, recommendations, approvals, documents, and weekly briefings.",
    live: [
      "Dashboard, AI Inbox simulation, tasks, weekly briefing, documents, approvals, integrations, ingest, audit, and settings surfaces",
      "Backend routes for items, tasks, recommendations, dashboard, briefing, documents, settings, integrations, audit, approvals, ingestion, and reset",
      "Approval gates for sensitive actions such as sending messages, making payments, and canceling subscriptions",
      "Local JSON persistence plus Prisma SQLite schema ready for the next repository milestone",
    ],
    links: [
      { label: "Product page", href: "/projects/plos" },
      { label: "PLOS changelog", href: "/blog/plos-mvp-foundation-live" },
      { label: "GitHub", href: "https://github.com/buildreubendev-eng/LifePilot", external: true },
      { label: "Discuss PLOS", href: "/contact?topic=plos" },
    ],
  },
];

const nextMilestones = [
  {
    title: "Business Simulator commercialization",
    owner: "Business Simulator",
    copy: "Keep the wedge focused on one real spreadsheet-modeled decision, saved results, shareable summaries, and a recommendation stakeholders can understand.",
  },
  {
    title: "PLOS persistence and frontend handoff",
    owner: "PLOS",
    copy: "Move beyond JSON-backed MVP state toward Prisma-backed repositories, then connect the Gemini-designed frontend to existing backend contracts.",
  },
  {
    title: "Reux developer access",
    owner: "Reux",
    copy: "Package the developer path, keep docs honest, and make local experimentation smoother without pretending the language is production-stable yet.",
  },
];

const verification = [
  "npm run lint",
  "npm run build",
  "npm run test:e2e:simulator",
  "npm run check:production",
];

const toneClasses: Record<string, string> = {
  cyan: "border-cyan-500/20 bg-cyan-500/[0.04] text-cyan-200",
  emerald: "border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-200",
  violet: "border-violet-500/20 bg-violet-500/[0.04] text-violet-200",
};

const iconClasses: Record<string, string> = {
  cyan: "text-cyan-300",
  emerald: "text-emerald-300",
  violet: "text-violet-300",
};

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24">
      <section className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            <Activity className="h-4 w-4 text-[#00F0FF]" />
            <span className="text-sm font-semibold uppercase tracking-wide text-gray-300">
              Ecosystem status
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            What is live, what is MVP, and what is next.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
            A current operating view of Reuben: Reux is the engine, Business Simulator is the first sellable product wedge, and PLOS is the personal life-admin MVP foundation.
          </p>
          <p className="mt-4 text-sm text-gray-500">Last refreshed: May 8, 2026</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AnimatedButton href="/simulator" variant="primary">
              Try Business Simulator
            </AnimatedButton>
            <AnimatedButton href="/projects/plos" variant="secondary">
              Review PLOS
            </AnimatedButton>
          </div>
        </div>
      </section>

      <EcosystemStatusStrip className="mt-16" />

      <LiveSystemStatus />

      <section className="container mx-auto mt-20 px-4 md:px-8">
        <div className="grid gap-6">
          {productStatus.map((product) => (
            <article key={product.name} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="border-b border-white/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/25">
                        <product.icon className={`h-6 w-6 ${iconClasses[product.tone]}`} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Product</p>
                        <h2 className="text-2xl font-black text-white">{product.name}</h2>
                      </div>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${toneClasses[product.tone]}`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed text-gray-400">{product.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {product.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-semibold text-gray-300 transition-colors hover:border-[#00F0FF]/35 hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 p-6 md:p-8">
                  {product.live.map((item) => (
                    <div key={item} className="flex gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                      <p className="text-sm leading-relaxed text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-20 px-4 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <Clock3 className="h-4 w-4 text-amber-300" />
              <span className="text-sm font-medium uppercase tracking-wide text-gray-300">Next milestones</span>
            </div>
            <h2 className="text-3xl font-bold text-white">The work that matters next</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              Reuben should keep shipping real product surfaces first. Language work stays useful when it is pulled forward by Business Simulator, PLOS, and concrete pilot workflows.
            </p>
          </div>
          <div className="grid gap-4">
            {nextMilestones.map((milestone) => (
              <div key={milestone.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#00F0FF]">
                  {milestone.owner}
                </div>
                <h3 className="text-lg font-bold text-white">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{milestone.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-20 px-4 md:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
            <ShieldCheck className="mb-5 h-7 w-7 text-emerald-300" />
            <h2 className="text-xl font-bold text-white">Privacy posture</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              This public website does not connect to Gmail, calendars, bank accounts, health records, or personal documents. PLOS describes and links to an MVP foundation, not a live personal-data integration service.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-6">
            <Database className="mb-5 h-7 w-7 text-cyan-300" />
            <h2 className="text-xl font-bold text-white">Backend posture</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Business Simulator uses the live Railway Reux backend when configured. PLOS currently has local MVP persistence plus a Prisma SQLite schema ready for the next persistence milestone.
            </p>
          </div>
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-6">
            <LockKeyhole className="mb-5 h-7 w-7 text-violet-300" />
            <h2 className="text-xl font-bold text-white">Approval posture</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              PLOS sensitive actions are approval-first by design. Sending messages, making payments, or canceling subscriptions should never happen without explicit user approval.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-20 px-4 md:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2">
                <Terminal className="h-4 w-4 text-[#00F0FF]" />
                <span className="text-sm font-medium uppercase tracking-wide text-gray-300">Verification</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Checks before sharing publicly</h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                These are the commands that should stay green before a public send, launch post, or founder pilot push.
              </p>
            </div>
            <div className="grid gap-3">
              {verification.map((command) => (
                <div key={command} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                  <GitBranch className="h-4 w-4 text-[#00F0FF]" />
                  <code className="font-mono text-sm text-gray-300">{command}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
