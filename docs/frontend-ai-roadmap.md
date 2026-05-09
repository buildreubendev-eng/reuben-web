# Frontend AI Roadmap: Opus + Gemini

Use this roadmap to split frontend work between Opus and Gemini without duplicating effort.

Opus should own the heavy implementation work: application structure, state, data flow, routing, integrations, test coverage, accessibility-critical interaction design, and anything that can break product behavior.

Gemini should own lighter frontend production tasks when Opus usage runs low: visual polish, copy refinement, spacing cleanup, responsive QA notes, component content passes, empty states, and design-system consistency checks.

## Product Context

Reuben currently needs the public frontend to make three products feel current and credible:

- **Reux**: prototype-complete backend engine with live model/status proof.
- **Business Simulator**: live Reux-powered product wedge for public demos and Founder Pilot conversion.
- **PLOS**: Personal Life Operating System, formerly LifePilot, now positioned as a real MVP foundation.

Frontend work should make these feel connected without pretending unfinished products are fully launched. The site should clearly distinguish live, prototype, MVP foundation, and upcoming work.

## Working Rules

- Keep the app usable at every checkpoint.
- Do not create placeholder-only pages.
- Do not remove existing live paths, smoke-test coverage, or PLOS/Reux/Simulator positioning.
- Reuse existing components, Tailwind patterns, and route structure before introducing new abstractions.
- Prefer small, shippable commits over broad rewrites.
- Every completed Opus milestone should run `npm run lint`, `npm run build`, and the relevant Playwright smoke tests.
- Gemini should avoid large architecture changes unless Opus has already created the component/data structure.

## Ownership Split

| Work Type | Owner | Notes |
|---|---|---|
| New routes or route restructuring | Opus | Routing changes affect smoke coverage and SEO. |
| Stateful UI, forms, filters, persisted state | Opus | Includes simulator flows, status hydration, and future PLOS demos. |
| API consumption and error handling | Opus | Especially `/api/status/reux`, contact, founder pilot, and future PLOS preview APIs. |
| Test creation or test repair | Opus | Gemini can suggest QA cases, but Opus should implement. |
| Copy polish and content hierarchy | Gemini | Keep factual status language intact. |
| Responsive spacing and visual cleanup | Gemini | Especially mobile and tablet refinement. |
| Icon swaps, badges, section labels | Gemini | Use existing icon/component conventions. |
| Empty states and microcopy | Gemini | Keep them concise and product-specific. |
| Accessibility review notes | Gemini drafts, Opus fixes | Opus implements ARIA/state changes. |
| Final production readiness pass | Opus | Build, lint, smoke, commit, push. |

## Milestone 1: Public Product Clarity

**Primary owner: Opus**

Goal: Make the Reuben website immediately explain what is real now across Reux, Business Simulator, and PLOS.

Opus tasks:

- Audit homepage, `/projects`, `/projects/reux`, `/projects/plos`, `/simulator`, `/docs`, and `/status` for inconsistent product status language.
- Centralize repeated product status copy if duplication starts drifting.
- Ensure every major product card has a clear status, CTA, and proof point.
- Add or maintain smoke coverage for any updated public route.

Gemini tasks:

- Tighten headings and subcopy so the pages feel premium but not overhyped.
- Suggest badge wording for statuses: Live, Prototype Complete, MVP Foundation, Next.
- Review mobile layout density and flag sections that feel too long or too stacked.

Acceptance criteria:

- A first-time visitor can answer: what can I try, what is prototype-complete, what is MVP foundation, and what is coming next.
- No page describes PLOS as only a future idea.
- Business Simulator remains the clearest public demo CTA.

## Milestone 2: Business Simulator Frontend Depth

**Primary owner: Opus**

Goal: Make the simulator feel like a polished product surface, not a sample demo.

Opus tasks:

- Review the simulator dashboard, new scenario flow, results page, and comparison page.
- Improve state handling for loading, saved-run expiration, API fallback, validation, and error recovery.
- Add better result summaries that explain what changed and why.
- Ensure comparison UX supports quick scanning on mobile and desktop.
- Expand Playwright coverage for critical simulator paths if gaps exist.

Gemini tasks:

- Polish result labels, empty states, helper copy, and CTA hierarchy.
- Review chart/table spacing and scanability.
- Suggest better names for scenario templates without changing underlying logic.
- Improve visual consistency of badges, buttons, and card headers.

Acceptance criteria:

- A non-technical visitor can complete a scenario, understand the recommendation, and know what to do next.
- API fallback states are clear and not alarming.
- Founder Pilot conversion remains visible after useful simulator output.

## Milestone 3: Reux Developer Confidence

**Primary owner: Opus**

Goal: Make Reux look technically credible to developers and founders evaluating the engine.

Opus tasks:

- Improve `/docs` information architecture if needed: quickstart, syntax, capabilities, local run path, integration notes.
- Keep `/status` connected to live backend/model checks.
- Make status errors actionable without exposing secrets or noisy internals.
- Add tests for new live-status UI behavior when response shape changes.

Gemini tasks:

- Polish docs copy for readability.
- Suggest section titles that are clearer for developers.
- Review status page language so degraded states feel calm and factual.

Acceptance criteria:

- Developers can understand what Reux is, what works today, and how to try it locally.
- Status page proves the backend/model catalog without requiring a terminal.

## Milestone 4: PLOS Public Preview

**Primary owner: Opus**

Goal: Give PLOS enough public frontend substance to support the MVP story without building fake integrations.

Opus tasks:

- Expand `/projects/plos` with concrete MVP surfaces: AI Inbox, tasks, weekly briefing, documents, approvals, settings, integrations, audit.
- If appropriate, add a static or mock interactive PLOS preview route that uses realistic mock data only.
- Clearly label mock/inactive integrations as permission-based future integrations.
- Add privacy and approval language near any sensitive action examples.
- Add smoke coverage for any new PLOS preview route.

Gemini tasks:

- Polish PLOS copy and visual grouping.
- Create empty-state and microcopy suggestions for inbox, documents, approvals, and settings.
- Review whether the page feels like a trusted personal command center rather than enterprise SaaS.

Acceptance criteria:

- PLOS feels real, scoped, and privacy-first.
- No bank, health, email, or calendar integration is implied to be live.
- The LifePilot codename does not replace the PLOS product name.

## Milestone 5: Navigation and Conversion

**Primary owner: Opus**

Goal: Make the site guide each visitor to the right next action.

Opus tasks:

- Audit nav/header/footer links for the main paths: Simulator, Reux, PLOS, Status, Docs, Founder Pilot, Contact.
- Ensure mobile navigation remains usable.
- Review conversion paths from homepage, simulator results, Reux page, PLOS page, and status page.
- Add tests for any navigation behavior change.

Gemini tasks:

- Suggest concise nav labels and CTA wording.
- Review whether repeated CTAs feel noisy.
- Polish footer grouping and short descriptions.

Acceptance criteria:

- Visitors can quickly find the live simulator, Reux docs/status, PLOS overview, and Founder Pilot request path.
- Mobile users do not hit dead ends.

## Milestone 6: Production Polish

**Primary owner: Opus**

Goal: Harden the public frontend before sharing widely.

Opus tasks:

- Run `npm run lint`.
- Run `npm run build`.
- Run `npx playwright test tests/frontend-smoke.spec.ts --project=chromium`.
- Run `node scripts/check-live-demo.mjs --site <target-site> --api <reux-api-url>` for production or preview validation.
- Fix any hydration, route, metadata, or smoke failures.
- Commit and push only after checks pass.

Gemini tasks:

- Do a final visual checklist pass from screenshots or local browser review.
- Flag copy that sounds stale, vague, or too future-tense.
- Check that long words, buttons, and cards do not overflow on mobile.

Acceptance criteria:

- Build and smoke checks pass.
- Public pages render without placeholder-only content.
- The product story is consistent: Reux engine, Business Simulator wedge, PLOS MVP foundation.

## Gemini Prompt

Use this when Opus usage runs low:

```text
You are working in the Reuben website frontend. Follow docs/frontend-ai-roadmap.md and only take Gemini-owned tasks unless explicitly told otherwise.

Your job is light frontend polish: copy clarity, spacing, responsive review, empty states, badges, icon choices, and consistency checks. Do not restructure routes, change state management, alter API behavior, or remove tests.

Focus on the current milestone I specify. Keep Reux, Business Simulator, and PLOS status language accurate:
- Reux is prototype-complete with live backend/model proof.
- Business Simulator is the live public product wedge.
- PLOS is the Personal Life Operating System MVP foundation, formerly LifePilot.

When finished, summarize changed files, what you improved, and anything Opus should handle next.
```

## Opus Prompt

Use this when you have Opus usage:

```text
You are working in the Reuben website frontend. Follow docs/frontend-ai-roadmap.md and prioritize Opus-owned heavy lifting.

Own architecture, routing, state, API handling, tests, responsive behavior that affects usability, accessibility-critical changes, and production readiness. Gemini may handle later polish, so leave clear component boundaries and avoid vague half-finished placeholders.

Current product truths:
- Reux is prototype-complete and has live backend/model status proof.
- Business Simulator is the live Reux-powered public product wedge.
- PLOS is the Personal Life Operating System MVP foundation, formerly LifePilot.

Implement the current milestone end to end. Run lint, build, and relevant Playwright smoke tests. Summarize changed files, commands run, any risks, and the next recommended Gemini polish tasks.
```

## Handoff Format

At the end of each AI work session, use this format:

```text
Completed:
- ...

Files changed:
- ...

Checks run:
- ...

Known risks:
- ...

Next for Opus:
- ...

Next for Gemini:
- ...
```
