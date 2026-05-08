import Link from "next/link";
import { BarChart3, BrainCircuit, Inbox, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusTone = "cyan" | "emerald" | "violet";

interface EcosystemItem {
  title: string;
  eyebrow: string;
  status: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: StatusTone;
}

const toneClasses: Record<StatusTone, string> = {
  cyan: "border-cyan-500/20 bg-cyan-500/[0.04] text-cyan-200",
  emerald: "border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-200",
  violet: "border-violet-500/20 bg-violet-500/[0.04] text-violet-200",
};

const iconClasses: Record<StatusTone, string> = {
  cyan: "text-cyan-300",
  emerald: "text-emerald-300",
  violet: "text-violet-300",
};

const items: EcosystemItem[] = [
  {
    title: "Reux",
    eyebrow: "Engine",
    status: "Prototype complete",
    description: "Backend language for schemas, typed queries, transactions, events, migrations, and simulations.",
    href: "/projects/reux",
    icon: BrainCircuit,
    tone: "cyan",
  },
  {
    title: "Business Simulator",
    eyebrow: "Product wedge",
    status: "Live",
    description: "Guided operational scenario planning for staffing, pricing, capacity, risk, and process decisions.",
    href: "/simulator",
    icon: BarChart3,
    tone: "emerald",
  },
  {
    title: "PLOS",
    eyebrow: "Consumer MVP",
    status: "MVP foundation",
    description: "Personal Life Operating System for turning life-admin noise into prioritized actions and approvals.",
    href: "/projects/plos",
    icon: Inbox,
    tone: "violet",
  },
];

export default function EcosystemStatusStrip({ className }: { className?: string }) {
  return (
    <section className={cn("relative z-20 border-y border-white/5 bg-[#0A0A0A]/40", className)}>
      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/20">
                    <item.icon className={cn("h-5 w-5", iconClasses[item.tone])} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{item.eyebrow}</p>
                    <h2 className="text-lg font-bold text-white">{item.title}</h2>
                  </div>
                </div>
                <span className={cn("rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider", toneClasses[item.tone])}>
                  {item.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
