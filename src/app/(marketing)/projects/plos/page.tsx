"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Archive,
  BellRing,
  BrainCircuit,
  CheckCircle2,
  Database,
  Inbox,
  LockKeyhole,
  MailCheck,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import Link from "next/link";
import { plosAppUrl, plosRepoUrl } from "@/lib/productLinks";

const mvpFeatures = [
  {
    icon: <Inbox className="h-7 w-7 text-[#00F0FF]" />,
    title: "AI Inbox Simulation",
    description:
      "Twenty realistic life-admin messages are parsed into bills, renewals, appointments, travel, documents, receipts, subscriptions, and personal replies.",
  },
  {
    icon: <Activity className="h-7 w-7 text-[#8A2BE2]" />,
    title: "Life Admin Score",
    description:
      "A 0-100 score ranks the user's admin load from overdue items, upcoming deadlines, confidence, financial impact, and category importance.",
  },
  {
    icon: <BrainCircuit className="h-7 w-7 text-[#00F0FF]" />,
    title: "Recommendations",
    description:
      "The backend turns active items into next moves, approval requests, documents to save, manual tasks, and audit-visible actions.",
  },
  {
    icon: <ShieldCheck className="h-7 w-7 text-[#8A2BE2]" />,
    title: "Approval Gates",
    description:
      "Sensitive actions such as sending messages, making payments, or canceling subscriptions require explicit user approval.",
  },
];

const backendCapabilities = [
  "REST API for items, tasks, dashboard summary, weekly briefing, recommendations, documents, settings, integrations, audit, approvals, ingest, and reset.",
  "Repository and service boundary ready for future Gmail, Google Calendar, Plaid, health, and connector adapters.",
  "Raw message ingestion that normalizes provider messages into life-admin items and tracks ingestion run history.",
  "JSON demo mode plus durable Prisma-backed persistence behind a repository switch.",
  "Health endpoint, SQLite migration, and Vitest coverage for prioritization, API behavior, service workflows, and Prisma persistence.",
];

const dashboardSections = [
  "Today's priority actions",
  "Upcoming deadlines",
  "Bills and renewals",
  "Appointments",
  "Travel items",
  "Documents to save",
  "Messages needing reply",
  "Subscription warnings",
];

const lifecycle = [
  {
    label: "Capture",
    copy: "Mock email, calendar, bill, document, and provider messages enter through the integration boundary.",
  },
  {
    label: "Understand",
    copy: "PLOS extracts category, due date, priority, confidence, original message, and suggested action.",
  },
  {
    label: "Prioritize",
    copy: "The scoring engine ranks work by due date proximity, overdue state, financial impact, category weight, and confidence.",
  },
  {
    label: "Act",
    copy: "The user reviews the recommendation, approves sensitive actions, creates tasks, saves documents, or ignores noise.",
  },
];

export default function PlosPage() {
  const primaryHref = plosAppUrl ?? plosRepoUrl;

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-5xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            <span className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
              MVP foundation live
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-black tracking-tight text-white md:text-7xl">
            PLOS
          </h1>
          <p className="mb-5 text-2xl font-bold text-white/90 md:text-4xl">
            Personal Life Operating System
          </p>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
            PLOS turns life-admin noise into a prioritized action dashboard: bills, renewals, appointments,
            travel confirmations, receipts, documents, deadlines, subscriptions, and personal replies.
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-gray-500">
            LifePilot was the working codename. The user-facing Reuben product is PLOS.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AnimatedButton href={primaryHref} variant="primary" external={Boolean(plosAppUrl)}>
              {plosAppUrl ? "Open PLOS MVP" : "View MVP Repo"}
            </AnimatedButton>
            <AnimatedButton href="/contact?topic=plos" variant="secondary">
              Discuss PLOS
            </AnimatedButton>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 grid gap-4 md:grid-cols-4"
        >
          {[
            { label: "Mock messages", value: "20+" },
            { label: "Backend endpoints", value: "20+" },
            { label: "Life Admin Score", value: "0-100" },
            { label: "Sensitive actions", value: "Approval first" },
          ].map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-3xl font-black text-white">{metric.value}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{metric.label}</div>
            </div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
        >
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-white/10 p-6 md:p-10 lg:border-b-0 lg:border-r">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/25 bg-[#00F0FF]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#00F0FF]">
                <Sparkles className="h-3.5 w-3.5" />
                First MVP slice
              </div>
              <h2 className="mb-5 text-3xl font-black tracking-tight text-white md:text-5xl">
                A command center for personal admin
              </h2>
              <p className="mb-6 text-base leading-relaxed text-gray-400 md:text-lg">
                The current MVP is intentionally privacy-first and integration-free. It uses realistic mock data and clean
                abstraction layers so Gmail, Calendar, Plaid, health, and document connectors can be added later without
                rewriting the product surface.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {dashboardSections.map((section) => (
                  <div key={section} className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-gray-300">
                    {section}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 p-6 md:p-10">
              {mvpFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <Database className="h-4 w-4 text-[#00F0FF]" />
              <span className="text-sm font-medium uppercase tracking-wide text-gray-300">Backend foundation</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">Built like a real product, not a mockup</h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-400">
              The backend already exposes typed service boundaries for the MVP workflows, while keeping real bank,
              email, calendar, and health integrations out of scope until users approve them.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects/reux" className="text-sm font-semibold text-[#00F0FF] hover:underline">
                Reux engine direction -&gt;
              </Link>
              <Link href="/projects/reux/roadmap" className="text-sm font-semibold text-gray-400 hover:text-white hover:underline">
                Ecosystem roadmap -&gt;
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {backendCapabilities.map((capability) => (
              <div key={capability} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <p className="text-sm leading-relaxed text-gray-300">{capability}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8A2BE2]/25 bg-[#8A2BE2]/10 px-4 py-2">
              <MailCheck className="h-4 w-4 text-[#8A2BE2]" />
              <span className="text-sm font-medium uppercase tracking-wide text-[#8A2BE2]">How it works</span>
            </div>
            <h2 className="text-3xl font-bold text-white">From noisy message to approved action</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {lifecycle.map((step, index) => (
              <div key={step.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{step.label}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{step.copy}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 grid gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: <LockKeyhole className="h-6 w-6 text-emerald-300" />,
              title: "Private by default",
              copy: "The MVP explains that user data is private and keeps real integrations disabled until permissioned.",
            },
            {
              icon: <Settings2 className="h-6 w-6 text-[#00F0FF]" />,
              title: "Category controls",
              copy: "Sensitive categories can be disabled so users decide what PLOS is allowed to classify and prioritize.",
            },
            {
              icon: <BellRing className="h-6 w-6 text-[#8A2BE2]" />,
              title: "Approval before action",
              copy: "No messages, payments, or subscription cancellations happen without an explicit approval step.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                {item.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{item.copy}</p>
            </div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center md:p-12"
        >
          <Archive className="mx-auto mb-5 h-10 w-10 text-[#00F0FF]" />
          <h2 className="mb-4 text-3xl font-bold text-white">Next milestone</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-400">
            Deploy the PLOS app, set its public URL in Reuben, then keep refining the Gemini-designed UI against the
            durable backend contracts already in place.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AnimatedButton href={primaryHref} variant="primary" external={Boolean(plosAppUrl)}>
              {plosAppUrl ? "Open PLOS MVP" : "Open GitHub"}
            </AnimatedButton>
            <AnimatedButton href="/projects" variant="secondary">
              Back to Projects
            </AnimatedButton>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
