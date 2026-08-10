import { describe, expect, it } from "vitest";
import { concepts } from "@/data/concepts";
import { buildReel, randomFrom } from "@/lib/topic-selection";

const tokens = concepts.find((concept) => concept.name === "Tokens")!;
const bigO = concepts.find((concept) => concept.name === "Notación Big O")!;

describe("topic selection", () => {
  it("rejects an empty concept pool", () => {
    expect(() => randomFrom([])).toThrow("at least one concept");
  });

  it("selects uniformly from the supplied pool", () => {
    const pool = [tokens, bigO] as const;

    expect(randomFrom(pool, () => 0)).toBe(tokens);
    expect(randomFrom(pool, () => 0.75)).toBe(bigO);
  });

  it("builds a finite reel that ends with the selected winner", () => {
    const reel = buildReel([tokens, bigO], null, bigO, 5, () => 0);

    expect(reel).toHaveLength(5);
    expect(reel.at(-1)).toBe(bigO);
  });
});
