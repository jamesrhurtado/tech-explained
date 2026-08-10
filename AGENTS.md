# Tech en 60 — Repository Guidance

## Purpose

Tech en 60 is a Spanish learning tool: choose a technical concept, research it for 15 minutes, then explain it in 60 seconds. Keep the experience focused, fast, and usable without accounts or a backend.

## Stack

- Use npm, Next.js App Router, React, and strict TypeScript.
- Keep dependencies minimal. Do not add a package or migrate frameworks unless the user explicitly requests it and the benefit is clear.
- Prefer Server Components by default. Use Client Components only for browser state or interaction; the main experience is client-side because it uses timers, animation, and `localStorage`.
- Access `window`, `localStorage`, and other browser APIs only behind a browser check or inside an effect/event handler.

## Source Map

- `app/page.tsx`: main route.
- `app/layout.tsx`: metadata, fonts, and root layout.
- `app/globals.css`: tokens, responsive layout, motion, and component styles.
- `components/tech-en-60.tsx`: client-side flow coordination and browser effects.
- `components/topic-picker.tsx`: category and topic selection UI.
- `components/challenge-timer.tsx`: research and explanation timer UI.
- `lib/challenge-state.ts`: pure timer state machine.
- `lib/persisted-selection.ts`: validated browser-storage boundary.
- `lib/topic-selection.ts`: uniform random and reel selection functions.
- `data/concepts.ts`: categories, concept names, and prompts.
- `DESIGN_MEMORY.md`: binding visual and interaction direction; read it before UI changes.

## Product Invariants

- Preserve the flow: choose → research for 15 minutes → explain in 60 seconds.
- Keep topic selection uniform and avoid immediate repeats unless the user requests different behavior.
- Keep the reel centered, keyboard operable, and compatible with reduced motion.
- Preserve `Space` for timer play/pause and `Escape` for returning to selection.
- Leaving a timer must stop it; resetting explanation mode restores the 3-second countdown.
- Treat stored category and concept values as optional and potentially stale.

## Content Rules

- Maintain 10 concise, recognizable concepts in each category: Inteligencia Artificial, Ingeniería de software, and Git y GitHub.
- A concept should express one teachable idea that can be explained in 60 seconds.
- Prefer established names such as `Notación Big O`; avoid unnecessarily long labels.
- Keep Spanish UI copy concise and consistent. Technical terms may remain in common English usage.

## UI and Accessibility

- Preserve the kinetic-reel identity, sharp geometry, dark green surfaces, cream text, and coral actions.
- Reuse existing CSS tokens and patterns before adding one-off values.
- Test long concept names at mobile and desktop widths.
- Keep visible focus states, semantic controls, readable contrast, and touch targets of at least 44px.
- Motion must communicate state; provide a useful `prefers-reduced-motion` path.

## Validation

- Run `npm run lint` after code or content changes.
- Run `npm run typecheck` and `npm test` after behavior changes.
- Run `npm run build` before handing off a completed change.
- Run `git diff --check` and inspect the final diff for accidental churn.
- When editing `data/concepts.ts`, verify 10 unique concepts per category and 30 total.
