import { categories, concepts, type Category, type Concept } from "@/data/concepts";

export const STORAGE_KEYS = {
  category: "tech60-category",
  concept: "tech60-concept",
} as const;

export type PersistedSelection = {
  category: Category;
  concept: Concept | null;
};

export function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isCategory(value: string | null): value is Category {
  return value !== null && categories.some((category) => category === value);
}

export function readPersistedSelection(storage: Storage | null): PersistedSelection {
  if (!storage) return { category: "Todos", concept: null };

  try {
    const storedCategory = storage.getItem(STORAGE_KEYS.category);
    const category = isCategory(storedCategory) ? storedCategory : "Todos";
    const storedConcept = storage.getItem(STORAGE_KEYS.concept);
    const concept = concepts.find((item) => item.name === storedConcept) ?? null;
    const belongsToCategory = concept && (
      category === "Todos" || concept.category === category
    );

    return {
      category,
      concept: belongsToCategory ? concept : null,
    };
  } catch {
    return { category: "Todos", concept: null };
  }
}

export function persistCategory(storage: Storage | null, category: Category) {
  try {
    storage?.setItem(STORAGE_KEYS.category, category);
  } catch {
    // Persistence is optional; the in-memory experience remains usable.
  }
}

export function persistConcept(storage: Storage | null, concept: Concept) {
  try {
    storage?.setItem(STORAGE_KEYS.concept, concept.name);
  } catch {
    // Persistence is optional; the in-memory experience remains usable.
  }
}

export function clearPersistedConcept(storage: Storage | null) {
  try {
    storage?.removeItem(STORAGE_KEYS.concept);
  } catch {
    // Persistence is optional; the in-memory experience remains usable.
  }
}
