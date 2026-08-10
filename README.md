# Tech en 60

**Investiga. Entiende. Explícalo.**

Tech en 60 is a focused practice tool for learning technical concepts through explanation. Choose a random topic, research it for 15 minutes, and explain it clearly in 60 seconds.

## How it works

1. Choose a category and generate a random concept.
2. Use the 15-minute timer to research the topic.
3. Use the prompts to organize the main ideas.
4. Start the 60-second timer and explain the concept out loud.

## Features

- 30 concepts across AI, software engineering, and Git/GitHub.
- Animated vertical topic reel with no immediate repeats.
- Dedicated 15-minute research and 60-second explanation modes.
- Pause, continue, and reset controls.
- Three-second countdown before speaking.
- Keyboard controls: `Space` starts or pauses a timer and `Escape` returns to topic selection.
- Category and selected topic persistence using local storage when available.
- Responsive, keyboard-accessible interface with reduced-motion support.
- No backend, accounts, analytics, or external services.

## Tech stack

- Next.js with App Router
- React and TypeScript
- Purpose-built CSS with no UI framework
- Local Instrument Serif and Manrope font packages
- CSS animations with no animation library

## Getting started

Requires Node.js 24 LTS and npm 11. The repository includes `.nvmrc` and
`.node-version` files for compatible version managers.

```bash
git clone https://github.com/jamesrhurtado/tech-explained.git
cd tech-explained
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Check the code with ESLint |
| `npm run typecheck` | Run strict TypeScript checks |
| `npm test` | Run the unit and interaction test suite |
| `npm run test:watch` | Run tests while editing |

## Project structure

```text
app/
  globals.css              Global design system and animations
  layout.tsx               Metadata, fonts, and root layout
  page.tsx                 Main route
components/
  challenge-timer.tsx      Research and explanation timer UI
  tech-en-60.tsx           Client-side experience coordinator
  topic-picker.tsx         Category and topic selection UI
  topic-reel.tsx           Reel and word-reveal presentation
data/
  concepts.ts              Categories, concepts, and prompts
lib/
  challenge-state.ts       Timer state machine
  persisted-selection.ts   Validated local-storage boundary
  topic-selection.ts       Uniform random and reel selection
tests/
  setup.ts                 Browser test environment
```

## Quality and security

The app has no backend, authentication, cookies, remote data, or user-submitted
HTML. Next.js adds a restrictive Content Security Policy and baseline browser
security headers. CI runs linting, type checks, tests, a production dependency
audit, and the production build on every pull request and push to `main`.

Use `npm ci` in CI or deployment environments so installation follows the
committed lockfile exactly. See `SECURITY.md` for reporting guidance and the
project's security boundaries.

For production, terminate HTTPS at a managed host or reverse proxy and do not
expose `next start` directly to the public internet. The application currently
keeps the Next.js server deployment path so its security headers are applied
consistently; the `/` route itself remains statically prerendered.

## Adding or editing concepts

Update `data/concepts.ts`. Each concept needs a name, an existing category, and a guiding prompt:

```ts
{
  name: "Event loop",
  category: "Ingeniería de software",
  prompt: "¿Qué es, qué problema resuelve y dónde se utiliza?",
}
```

The application automatically includes the new concept in its category and in the random selection reel.
