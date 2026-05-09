import { expect, test } from "@playwright/test";

const publicPages = [
  { path: "/", heading: /Simulate Before/i },
  { path: "/projects", heading: "Our Work" },
  { path: "/projects/reux", heading: "Reux Programming Language" },
  { path: "/projects/plos", heading: "PLOS" },
  { path: "/projects/reux/roadmap", heading: "Reux Roadmap" },
  { path: "/projects/reux/demo", heading: /Try the Reux commerce console/i },
  { path: "/docs", heading: "Getting Started with Reux" },
  { path: "/status", heading: /What is live, what is MVP/i },
  { path: "/blog/ecosystem-status-and-shipping-proof-live", heading: "Reuben Ecosystem Status and Shipping Proof Are Live" },
  { path: "/founder-pilot", heading: /Turn one spreadsheet decision/i },
  { path: "/founder-pilot/outreach", heading: /First-customer outreach/i },
  { path: "/founder-pilot/demo-script", heading: /Five-minute Founder Pilot walkthrough/i },
  { path: "/founder-pilot/intake", heading: /Send this before a Founder Pilot call/i },
  { path: "/founder-pilot/delivery-template", heading: /Founder Pilot closeout format/i },
  { path: "/simulator", heading: "Business Simulator" },
];

test.describe("public frontend smoke", () => {
  for (const pageConfig of publicPages) {
    test(`${pageConfig.path} renders polished public content`, async ({ page }) => {
      await page.goto(pageConfig.path);

      await expect(page.getByRole("heading", { name: pageConfig.heading }).first()).toBeVisible();
      await expect(page.locator("body")).not.toContainText("NEXT_PUBLIC_REUX_DEMO_URL");
      await expect(page.locator("body")).not.toContainText("\u00e2");
    });
  }

  test("demo fallback keeps visitors moving when the hosted console is not configured", async ({ page }) => {
    await page.goto("/projects/reux/demo");

    await expect(page.getByRole("heading", { name: "The hosted console is being refreshed." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Try Business Simulator" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Developer Preview" }).first()).toBeVisible();
  });

  test("homepage exposes the current ecosystem shipping proof", async ({ page }) => {
    await page.goto("/");

    const latest = page.locator("section").filter({
      has: page.getByRole("heading", { name: "What is real in the Reuben stack right now" }),
    });

    await expect(latest).toBeVisible();
    await expect(latest.getByText("Live product wedge", { exact: true })).toBeVisible();
    await expect(latest.getByText("Prototype complete", { exact: true })).toBeVisible();
    await expect(latest.getByText("MVP foundation", { exact: true })).toBeVisible();
    await expect(latest.getByText("Crawler-ready sitemap and robots routes")).toBeVisible();
  });

  test("PLOS page is ready for a deployed app URL", async ({ page }) => {
    await page.goto("/projects/plos");

    await expect(page.getByText("JSON demo mode plus durable Prisma-backed persistence")).toBeVisible();
    await expect(page.getByText("Deploy the PLOS app, set its public URL in Reuben")).toBeVisible();
    await expect(page.getByRole("link", { name: "View MVP Repo" })).toBeVisible();
  });

  test("status page hydrates the live Reux health panel", async ({ page }) => {
    await page.route("**/api/status/reux", async (route) => {
      await route.fulfill({
        json: {
          ok: true,
          configured: true,
          url: "https://reux-pilot-demo-production.up.railway.app",
          apiVersion: "2026-05-02",
          productSimulations: ["operations_decision", "personal_finance"],
          latencyMs: { total: 142, health: 52, catalog: 90 },
          checks: [
            { name: "Backend health", ok: true, latencyMs: 52 },
            { name: "Model catalog", ok: true, latencyMs: 90 },
            { name: "Expected models", ok: true, detail: "5 expected models present" },
          ],
          checkedAt: new Date().toISOString(),
          models: [
            {
              name: "operations_decision",
              dimensions: { domain: "operations" },
              forecast: { periods: 12, unit: "week" },
              metricCount: 8,
            },
            {
              name: "personal_finance",
              dimensions: { domain: "finance" },
              forecast: { periods: 24, unit: "month" },
              metricCount: 6,
            },
          ],
        },
      });
    });

    await page.goto("/status");

    await expect(page.getByText("Live Reux backend connected")).toBeVisible();
    await expect(page.getByText("Operations Decision")).toBeVisible();
    await expect(page.getByText("Personal Finance")).toBeVisible();
    await expect(page.getByText("Backend health")).toBeVisible();
    await expect(page.getByText("Model catalog")).toBeVisible();
    await expect(page.getByText("5 expected models present")).toBeVisible();
    await expect(page.getByText("142ms")).toBeVisible();
  });
});
