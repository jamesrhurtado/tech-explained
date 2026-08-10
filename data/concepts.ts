export const categories = [
  "Todos",
  "Inteligencia Artificial",
  "Ingeniería de software",
  "Git y GitHub",
] as const;

export type Category = (typeof categories)[number];
export type TopicCategory = Exclude<Category, "Todos">;

type ConceptDefinition = {
  name: string;
  category: TopicCategory;
  prompt: string;
};

const prompt = "¿Qué es, qué problema resuelve y dónde se utiliza?";

export const concepts = [
  { name: "Tokens", category: "Inteligencia Artificial", prompt },
  { name: "Prompt", category: "Inteligencia Artificial", prompt },
  { name: "Ventana de contexto", category: "Inteligencia Artificial", prompt },
  { name: "Embeddings", category: "Inteligencia Artificial", prompt },
  { name: "RAG", category: "Inteligencia Artificial", prompt },
  { name: "Agentes de IA", category: "Inteligencia Artificial", prompt },
  { name: "Fine-tuning", category: "Inteligencia Artificial", prompt },
  { name: "Temperatura", category: "Inteligencia Artificial", prompt },
  { name: "Alucinaciones", category: "Inteligencia Artificial", prompt },
  { name: "Modelo multimodal", category: "Inteligencia Artificial", prompt },

  { name: "API", category: "Ingeniería de software", prompt },
  { name: "Caché", category: "Ingeniería de software", prompt },
  { name: "Notación Big O", category: "Ingeniería de software", prompt },
  { name: "Pruebas unitarias", category: "Ingeniería de software", prompt },
  { name: "Programación asíncrona", category: "Ingeniería de software", prompt },
  { name: "Tipado estático", category: "Ingeniería de software", prompt },
  { name: "Base de datos relacional", category: "Ingeniería de software", prompt },
  { name: "Deuda técnica", category: "Ingeniería de software", prompt },
  { name: "CI/CD", category: "Ingeniería de software", prompt },
  { name: "Microservicios", category: "Ingeniería de software", prompt },

  { name: "Commit", category: "Git y GitHub", prompt },
  { name: "Branch", category: "Git y GitHub", prompt },
  { name: "Merge", category: "Git y GitHub", prompt },
  { name: "Rebase", category: "Git y GitHub", prompt },
  { name: "Pull request", category: "Git y GitHub", prompt },
  { name: "Conflicto de merge", category: "Git y GitHub", prompt },
  { name: "GitHub Actions", category: "Git y GitHub", prompt },
  { name: "Cherry-pick", category: "Git y GitHub", prompt },
  { name: "Fork", category: "Git y GitHub", prompt },
  { name: ".gitignore", category: "Git y GitHub", prompt },
] as const satisfies readonly ConceptDefinition[];

export type Concept = (typeof concepts)[number];
