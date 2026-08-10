# Design Memory

## Brand Tone

- Editorial, technical, warm, memorable, and camera-ready.
- The interface should feel like a focused learning instrument, not a dashboard or generic landing-page template.
- Avoid floating cards, decorative gradients, excessive rounding, and filler navigation.

## Signature Element

- The vertical concept reel is the product identity.
- Topic names always align to the horizontal center, including adjacent items during the spin.
- Use a coral pointer and restrained guide rules to make the selected reel row obvious.
- Scale long topic names down by content length so every reel row keeps the same rhythm without clipping.

## Layout and Typography

- Use a single centered stage with sharp edges and thin structural borders.
- Keep density comfortable, but let the selected concept occupy most of the visual field.
- Instrument Serif carries concepts and large numbers; Manrope carries controls and metadata.
- Metadata is compact, uppercase, and deliberately quiet.

## Color and Interaction

- Use deep green-black surfaces, warm cream text, and coral for selection and primary action.
- Secondary text may stay quiet, but must remain readable against the dark surface.
- Motion should explain the reel's movement or timer state; avoid decorative animation.
- Keep explicit focus states, minimum 44px touch targets, and a reduced-motion path.

## Product Flow

- Preserve the ritual: choose → research for 15 minutes → explain in 60 seconds.
- Categories are a segmented rail, not pills.
- After a concept is selected, keep “spin again,” “research,” and “explain” visible together.

## Repo Conventions

- Next.js App Router with TypeScript.
- Global design tokens and page styling live in `app/globals.css`.
- Product interaction logic lives in `components/tech-en-60.tsx`.
- Add no UI dependency unless it materially improves functionality.
