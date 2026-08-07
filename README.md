# Tech en 60

**Investiga. Entiende. Explícalo.**

Tech en 60 is a focused practice tool for learning technical concepts through explanation. Choose a random topic, research it for 15 minutes, and explain it clearly in 60 seconds.

## How it works

1. Choose a category and generate a random concept.
2. Use the 15-minute timer to research the topic.
3. Use the prompts to organize the main ideas.
4. Start the 60-second timer and explain the concept out loud.

## Features

- 36 concepts across AI, programming, Git/GitHub, and software fundamentals.
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
- Tailwind CSS
- Local Instrument Serif and Manrope font packages
- CSS animations with no animation library

## Getting started

Requires Node.js 20.9 or newer.

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

## Project structure

```text
app/
  globals.css              Global design system and animations
  layout.tsx               Metadata, fonts, and root layout
  page.tsx                 Main route
components/
  tech-en-60.tsx           Topic selector and timer experience
data/
  concepts.ts              Categories, concepts, and prompts
```

## Adding or editing concepts

Update `data/concepts.ts`. Each concept needs a name, an existing category, and a guiding prompt:

```ts
{
  name: "Event loop",
  category: "Programación",
  prompt: "¿Qué es, qué problema resuelve y dónde se utiliza?",
}
```

The application automatically includes the new concept in its category and in the random selection reel.
