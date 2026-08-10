import { beforeEach, describe, expect, it } from "vitest";
import { readPersistedSelection, STORAGE_KEYS } from "@/lib/persisted-selection";

describe("persisted selection", () => {
  beforeEach(() => window.localStorage.clear());

  it("restores a concept that belongs to the stored category", () => {
    window.localStorage.setItem(STORAGE_KEYS.category, "Inteligencia Artificial");
    window.localStorage.setItem(STORAGE_KEYS.concept, "Tokens");

    expect(readPersistedSelection(window.localStorage)).toMatchObject({
      category: "Inteligencia Artificial",
      concept: { name: "Tokens" },
    });
  });

  it("rejects stale or category-incompatible concepts", () => {
    window.localStorage.setItem(STORAGE_KEYS.category, "Git y GitHub");
    window.localStorage.setItem(STORAGE_KEYS.concept, "Tokens");

    expect(readPersistedSelection(window.localStorage)).toEqual({
      category: "Git y GitHub",
      concept: null,
    });
  });

  it("falls back safely when stored values are unknown", () => {
    window.localStorage.setItem(STORAGE_KEYS.category, "Unknown");
    window.localStorage.setItem(STORAGE_KEYS.concept, "Unknown");

    expect(readPersistedSelection(window.localStorage)).toEqual({
      category: "Todos",
      concept: null,
    });
  });

  it("keeps working when browser storage access is denied", () => {
    const deniedStorage = {
      getItem: () => { throw new Error("denied"); },
    } as unknown as Storage;

    expect(readPersistedSelection(deniedStorage)).toEqual({
      category: "Todos",
      concept: null,
    });
  });
});
