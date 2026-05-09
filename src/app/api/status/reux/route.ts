import { NextResponse } from "next/server";

const DEFAULT_REUX_API_URL = "https://reux-pilot-demo-production.up.railway.app";
const EXPECTED_MODELS = [
  "operations_decision",
  "personal_finance",
  "habit_consistency",
  "workforce_change",
  "operations_throughput",
];

interface ReuxHealthResponse {
  ok?: boolean;
  productSimulations?: string[];
  apiVersion?: string;
  [key: string]: unknown;
}

interface ReuxCatalogResponse {
  simulations?: Array<{
    name: string;
    dimensions?: Record<string, string>;
    forecast?: {
      periods: number;
      unit: string;
    };
    metrics?: unknown[];
  }>;
}

export async function GET() {
  const apiUrl = normalizeUrl(process.env.NEXT_PUBLIC_REUX_DEMO_URL ?? DEFAULT_REUX_API_URL);
  const startedAt = performance.now();

  try {
    const [healthResult, catalogResult] = await Promise.all([
      fetchJsonWithTiming<ReuxHealthResponse>(`${apiUrl}/api/health`),
      fetchJsonWithTiming<ReuxCatalogResponse>(`${apiUrl}/api/reux/simulations`),
    ]);

    const health = healthResult.body;
    const catalog = catalogResult.body;
    const simulations = Array.isArray(catalog.simulations) ? catalog.simulations : [];
    const productSimulations = Array.isArray(health.productSimulations) ? health.productSimulations : [];
    const modelNames = simulations.map((simulation) => simulation.name);
    const missingExpectedModels = EXPECTED_MODELS.filter((model) => !modelNames.includes(model));
    const ok = health.ok === true && missingExpectedModels.length === 0;

    return NextResponse.json({
      ok,
      configured: true,
      url: apiUrl,
      apiVersion: health.apiVersion,
      productSimulations,
      missingExpectedModels,
      latencyMs: {
        total: Math.round(performance.now() - startedAt),
        health: healthResult.latencyMs,
        catalog: catalogResult.latencyMs,
      },
      checks: [
        {
          name: "Backend health",
          ok: health.ok === true,
          latencyMs: healthResult.latencyMs,
        },
        {
          name: "Model catalog",
          ok: simulations.length > 0,
          latencyMs: catalogResult.latencyMs,
        },
        {
          name: "Expected models",
          ok: missingExpectedModels.length === 0,
          detail: missingExpectedModels.length === 0
            ? `${EXPECTED_MODELS.length} expected models present`
            : `Missing ${missingExpectedModels.join(", ")}`,
        },
      ],
      models: simulations.map((simulation) => ({
        name: simulation.name,
        dimensions: simulation.dimensions ?? {},
        forecast: simulation.forecast ?? null,
        metricCount: Array.isArray(simulation.metrics) ? simulation.metrics.length : 0,
      })),
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        url: apiUrl,
        latencyMs: {
          total: Math.round(performance.now() - startedAt),
        },
        checks: [
          {
            name: "Backend health",
            ok: false,
            detail: error instanceof Error ? error.message : "Reux status check failed.",
          },
        ],
        models: [],
        checkedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Reux status check failed.",
      },
      { status: 200 },
    );
  }
}

async function fetchJsonWithTiming<T>(url: string): Promise<{ body: T; latencyMs: number }> {
  const startedAt = performance.now();
  const response = await fetch(url, {
    headers: { accept: "application/json" },
    next: { revalidate: 30 },
  });
  const latencyMs = Math.round(performance.now() - startedAt);

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`${url} returned ${response.status}${detail ? `: ${detail.slice(0, 160)}` : ""}`);
  }

  return {
    body: await response.json() as T,
    latencyMs,
  };
}

function normalizeUrl(value: string) {
  return value.replace(/\/$/, "");
}
