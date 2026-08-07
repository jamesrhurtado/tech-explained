export const categories = [
  "Todos",
  "Inteligencia Artificial",
  "Programación",
  "Git y GitHub",
  "Conceptos de software",
] as const;

export type Category = (typeof categories)[number];
export type TopicCategory = Exclude<Category, "Todos">;

export type Concept = {
  name: string;
  category: TopicCategory;
  prompt: string;
};

const prompt = "¿Qué es, qué problema resuelve y dónde se utiliza?";

export const concepts: Concept[] = [
  { name: "Tokens", category: "Inteligencia Artificial", prompt },
  { name: "Ventana de contexto", category: "Inteligencia Artificial", prompt },
  { name: "Embeddings", category: "Inteligencia Artificial", prompt },
  { name: "RAG", category: "Inteligencia Artificial", prompt },
  { name: "Agentes de IA", category: "Inteligencia Artificial", prompt },
  { name: "MCP", category: "Inteligencia Artificial", prompt },
  { name: "Fine-tuning", category: "Inteligencia Artificial", prompt },
  { name: "Temperatura de un modelo", category: "Inteligencia Artificial", prompt },
  { name: "Alucinación de IA", category: "Inteligencia Artificial", prompt },
  { name: "Modelo multimodal", category: "Inteligencia Artificial", prompt },
  { name: "API", category: "Programación", prompt },
  { name: "Caché", category: "Programación", prompt },
  { name: "Recursión", category: "Programación", prompt },
  { name: "Big O", category: "Programación", prompt },
  { name: "Pruebas unitarias", category: "Programación", prompt },
  { name: "Compilador", category: "Programación", prompt },
  { name: "Programación asíncrona", category: "Programación", prompt },
  { name: "Tipado estático", category: "Programación", prompt },
  { name: "Commit", category: "Git y GitHub", prompt },
  { name: "Branch", category: "Git y GitHub", prompt },
  { name: "Merge", category: "Git y GitHub", prompt },
  { name: "Rebase", category: "Git y GitHub", prompt },
  { name: "Pull request", category: "Git y GitHub", prompt },
  { name: "Conflicto de Git", category: "Git y GitHub", prompt },
  { name: "GitHub Actions", category: "Git y GitHub", prompt },
  { name: "Cherry-pick", category: "Git y GitHub", prompt },
  { name: "Base de datos relacional", category: "Conceptos de software", prompt },
  { name: "Deuda técnica", category: "Conceptos de software", prompt },
  { name: "CI/CD", category: "Conceptos de software", prompt },
  { name: "Arquitectura de microservicios", category: "Conceptos de software", prompt },
  { name: "Contenedores", category: "Conceptos de software", prompt },
  { name: "Autenticación vs. autorización", category: "Conceptos de software", prompt },
  { name: "Escalabilidad horizontal", category: "Conceptos de software", prompt },
  { name: "Webhooks", category: "Conceptos de software", prompt },
  { name: "Cola de mensajes", category: "Conceptos de software", prompt },
  { name: "Sistema distribuido", category: "Conceptos de software", prompt },
];
