import { NextResponse } from "next/server";

const DEFAULT_REUX_API_URL = "https://reux-pilot-demo-production.up.railway.app";

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

  try {
    const [health, catalog] = await Promise.all([
      fetchJson<ReuxHealthResponse>(`${apiUrl}/api/health`),
      fetchJson<ReuxCatalogResponse>(`${apiUrl}/api/reux/simulations`),
    ]);

    const simulations = Array.isArray(catalog.simulations) ? catalog.simulations : [];
    const productSimulations = Array.isArray(health.productSimulations) ? health.productSimulations : [];

    return NextResponse.json({
      ok: health.ok === true,
      configured: true,
      url: apiUrl,
      apiVersion: health.apiVersion,
      productSimulations,
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
        models: [],
        checkedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Reux status check failed.",
      },
      { status: 200 },
    );
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { accept: "application/json" },
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`${url} returned ${response.status}${detail ? `: ${detail.slice(0, 160)}` : ""}`);
  }

  return response.json() as Promise<T>;
}

function normalizeUrl(value: string) {
  return value.replace(/\/$/, "");
}
