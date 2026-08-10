import type { CSSProperties } from "react";
import type { Concept } from "@/data/concepts";

export function topicLengthClass(name: string) {
  if (name.length >= 27) return "is-long";
  if (name.length >= 20) return "is-medium";
  return "";
}

export function TopicTitle({ concept }: { concept: Concept | null }) {
  if (!concept) return <h1 id="card-title">¿Listo para el reto?</h1>;

  const words = concept.name.split(/\s+/);

  return (
    <h1 id="card-title" className={`topic-title is-revealing ${topicLengthClass(concept.name)}`} aria-label={concept.name}>
      {words.map((word, index) => (
        <span className="title-word-wrap" aria-hidden="true" key={`${word}-${index}`}>
          <span className="title-word" style={{ animationDelay: `${index * 70}ms` }}>{word}</span>
          {index < words.length - 1 && <span className="title-space">&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
}

export function TopicReel({ items }: { items: readonly Concept[] }) {
  const stop = items.length > 0 ? ((items.length - 1) / (items.length + 2)) * 100 : 0;

  return (
    <div className="reel-window" aria-hidden="true">
      <div
        className="reel-track"
        style={{ "--reel-stop": `-${stop}%` } as CSSProperties}
      >
        {items.map((item, index) => (
          <div className={`reel-item ${topicLengthClass(item.name)} ${index === items.length - 1 ? "is-winner" : ""}`} key={`${item.name}-${index}`}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
