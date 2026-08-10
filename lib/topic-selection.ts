import type { Concept } from "@/data/concepts";

type RandomSource = () => number;

function requireItems(items: readonly Concept[]): asserts items is readonly [Concept, ...Concept[]] {
  if (items.length === 0) {
    throw new Error("Topic selection requires at least one concept.");
  }
}

function normalizedRandom(random: RandomSource) {
  const value = random();
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), 1 - Number.EPSILON);
}

export function randomFrom(
  items: readonly Concept[],
  random: RandomSource = Math.random,
): Concept {
  requireItems(items);
  return items[Math.floor(normalizedRandom(random) * items.length)]!;
}

export function buildReel(
  items: readonly Concept[],
  current: Concept | null,
  winner: Concept,
  reelLength: number,
  random: RandomSource = Math.random,
) {
  requireItems(items);

  if (!items.some((item) => item.name === winner.name)) {
    throw new Error("The reel winner must belong to the active concept pool.");
  }

  if (reelLength < 2) {
    throw new Error("A topic reel requires at least two rows.");
  }

  const reel: Concept[] = [];
  const firstPool = items.filter((item) => item.name !== winner.name);
  reel.push(
    current && current.name !== winner.name
      ? current
      : randomFrom(firstPool.length ? firstPool : items, random),
  );

  while (reel.length < reelLength - 1) {
    const previous = reel.at(-1)!;
    const pool = items.filter(
      (item) => item.name !== previous.name && item.name !== winner.name,
    );
    reel.push(randomFrom(pool.length ? pool : items, random));
  }

  reel.push(winner);
  return reel;
}
