"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Server,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LoadState = "idle" | "loading" | "ready" | "error";

interface LiveStatusState {
  state: LoadState;
  response?: ReuxStatusResponse;
  checkedAt?: string;
  error?: string;
}

interface ReuxStatusModel {
  name: string;
  dimensions: Record<string, string>;
  forecast: {
    periods: number;
    unit: string;
  } | null;
  metricCount: number;
}

interface ReuxStatusResponse {
  ok: boolean;
  configured: boolean;
  url?: string;
  apiVersion?: string;
  productSimulations?: string[];
  models: ReuxStatusModel[];
  checkedAt: string;
  error?: string;
}

const expectedModels = [
  "operations_decision",
  "personal_finance",
  "habit_consistency",
  "workforce_change",
  "operations_throughput",
];

export default function LiveSystemStatus() {
  const [status, setStatus] = useState<LiveStatusState>({
    state: "idle",
  });

  async function loadStatus() {
    setStatus((current) => ({
      ...current,
      state: "loading",
      error: undefined,
    }));

    try {
      const response = await fetch("/api/status/reux", {
        headers: { accept: "application/json" },
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? `Status route returned ${response.status}.`);
      }

      setStatus({
        state: "ready",
        response: payload,
        checkedAt: payload.checkedAt ?? new Date().toISOString(),
      });
    } catch (error) {
      setStatus({
        state: "error",
        checkedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Live status check failed.",
      });
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadStatus();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const modelNames = useMemo(
    () => (status.response?.models ?? []).map((model) => model.name),
    [status.response?.models],
  );
  const missingExpectedModels = expectedModels.filter((model) => !modelNames.includes(model));
  const isLoading = status.state === "loading" || status.state === "idle";
  const isLive = status.response?.ok === true;
  const isConfigured = status.response?.configured === true;
  const models = status.response?.models ?? [];

  return (
    <section className="container mx-auto mt-16 px-4 md:px-8">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-white/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
                  <Activity className="h-3.5 w-3.5" />
                  Live system check
                </div>
                <h2 className="text-2xl font-black text-white">Backend and model health</h2>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={loadStatus}
                disabled={isLoading}
                className="gap-2 border-white/10 bg-black/20 text-white hover:bg-white/[0.06]"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                Refresh
              </Button>
            </div>

            <div className={cn(
              "mb-5 flex items-start gap-3 rounded-xl border p-4",
              isLoading
                ? "border-cyan-500/20 bg-cyan-500/[0.04]"
                : isLive
                  ? "border-emerald-500/20 bg-emerald-500/[0.04]"
                  : isConfigured
                    ? "border-rose-500/20 bg-rose-500/[0.04]"
                    : "border-amber-500/20 bg-amber-500/[0.04]",
            )}>
              <StatusIcon loading={isLoading} live={isLive} configured={isConfigured} />
              <div>
                <h3 className="text-sm font-bold text-white">
                  {isLoading
                    ? "Checking live backend"
                    : isLive
                      ? "Live Reux backend connected"
                      : isConfigured
                        ? "Live backend degraded"
                        : "Local/mock mode"}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-400">
                  {status.error ?? status.response?.error ?? statusMessage(status.response) ?? "Checking the configured backend and model catalog."}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Metric label="Backend" value={isLoading ? "Checking" : isLive ? "Live" : isConfigured ? "Degraded" : "Mock"} />
              <Metric label="Models" value={isLoading ? "..." : String(models.length)} />
              <Metric label="Checked" value={formatCheckedAt(status.checkedAt)} />
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Executable catalog</p>
                <h3 className="text-xl font-bold text-white">Reux models available to product apps</h3>
              </div>
              <Server className="h-5 w-5 text-cyan-300" />
            </div>

            {isLoading ? (
              <div className="grid gap-3">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="h-16 animate-pulse rounded-xl border border-white/10 bg-white/[0.03]" />
                ))}
              </div>
            ) : models.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {models.map((model) => (
                  <div key={model.name} className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h4 className="truncate text-sm font-bold text-white">{formatModelName(model.name)}</h4>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                    </div>
                    <div className="grid gap-1 text-xs text-gray-500">
                      <span>Domain: <strong className="font-medium text-gray-300">{model.dimensions.domain ?? "custom"}</strong></span>
                      <span>Forecast: <strong className="font-medium text-gray-300">{model.forecast ? `${model.forecast.periods} ${model.forecast.unit}s` : "n/a"}</strong></span>
                      <span>Metrics: <strong className="font-medium text-gray-300">{model.metricCount}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm leading-relaxed text-gray-400">
                  No live catalog is available in this environment. Public product pages still render from static website content.
                </p>
              </div>
            )}

            {!isLoading && missingExpectedModels.length > 0 && isLive && (
              <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                  <p className="text-sm leading-relaxed text-amber-100/80">
                    Expected models missing from catalog: {missingExpectedModels.join(", ")}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function statusMessage(response?: ReuxStatusResponse) {
  if (!response) return undefined;
  if (response.ok) {
    const modelCount = response.models.length;
    return `Connected to ${response.url ?? "the Reux backend"} with ${modelCount} executable model${modelCount === 1 ? "" : "s"}.`;
  }
  if (response.error) return response.error;
  return "The Reux backend did not report a healthy status.";
}

function StatusIcon({
  loading,
  live,
  configured,
}: {
  loading: boolean;
  live: boolean;
  configured: boolean;
}) {
  if (loading) return <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin text-cyan-300" />;
  if (live) return <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />;
  if (configured) return <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />;
  return <WifiOff className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-lg font-black text-white">{value}</div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">{label}</div>
    </div>
  );
}

function formatCheckedAt(value?: string) {
  if (!value) return "Pending";

  try {
    return new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "Checked";
  }
}

function formatModelName(value: string) {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
