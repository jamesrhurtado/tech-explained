# Design Implementation Plan: Tech en 60

## Summary

- **Scope:** Full landing experience
- **Target:** `components/tech-en-60.tsx` and `app/globals.css`
- **Winner:** Variant D — Kinetic Reel
- **Status:** Implemented
- **Key decision:** The concept selector is the page's visual identity, with every topic centered inside the reel.

## Implemented Changes

- [x] Turn the category filters into a compact segmented rail.
- [x] Center topic names and supporting copy in every selector state.
- [x] Add a coral reel pointer and horizontal selection guides.
- [x] Convert the next steps into an integrated action dock.
- [x] Carry the new visual system into the research and explanation timers.
- [x] Preserve the existing randomizer, saved state, keyboard controls, and reduced-motion behavior.

## Required UI States

- **Empty:** Centered invitation to spin the reel.
- **Selecting:** Three-row vertical reel with muted neighbors and a centered winner.
- **Selected:** Centered concept, description, and three clear next actions.
- **Research:** 15-minute timer with the three research prompts.
- **Explain:** Three-second preparation countdown followed by the 60-second timer.
- **Disabled:** The reel action is visibly muted while selection is in progress.

## Accessibility and Testing

- [x] Native buttons and semantic navigation preserved.
- [x] Visible keyboard focus states preserved.
- [x] Live announcements and timer labels preserved.
- [x] Reduced-motion alternative preserved.
- [x] Mobile touch targets remain at least 44px.
- [x] ESLint, TypeScript, and production build pass.

## Design Tokens

- **Ink:** `#0e1411`
- **Surface:** `#141c18`
- **Cream:** `#f4ebdd`
- **Coral:** `#ff7a45`
- **Display:** Instrument Serif
- **UI and metadata:** Manrope Variable

