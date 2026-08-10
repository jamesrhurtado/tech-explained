import { ArrowIcon } from "@/components/icons";
import { TopicReel, TopicTitle } from "@/components/topic-reel";
import type { Concept } from "@/data/concepts";

type TopicPickerProps = {
  categoryLabel: string;
  displayed: Concept | null;
  filtered: readonly Concept[];
  isShuffling: boolean;
  reelItems: readonly Concept[];
  selected: Concept | null;
  onPick: () => void;
  onResearch: () => void;
  onSpeak: () => void;
};

export function TopicPicker({
  categoryLabel,
  displayed,
  filtered,
  isShuffling,
  reelItems,
  selected,
  onPick,
  onResearch,
  onSpeak,
}: TopicPickerProps) {
  return (
    <>
      <div className="card-heading">
        <p className="eyebrow">Concepto / {categoryLabel}</p>
        <p className="topic-count">{String(filtered.length).padStart(2, "0")} temas</p>
      </div>
      <span className="reel-pointer" aria-hidden="true">→</span>
      <div className={`topic-stage ${isShuffling ? "is-spinning" : ""}`} aria-busy={isShuffling}>
        {isShuffling ? (
          <>
            <h1 id="card-title" className="sr-only">Seleccionando concepto</h1>
            <TopicReel items={reelItems} />
          </>
        ) : (
          <div className="topic-copy" key={displayed?.name ?? "empty"}>
            <TopicTitle concept={displayed} />
            <p>{displayed?.prompt ?? "Un concepto. Quince minutos. Una explicación clara."}</p>
          </div>
        )}
      </div>
      <div className="selection-controls">
        <button className="primary-button shuffle-button" onClick={onPick} disabled={isShuffling}>
          <span>{isShuffling ? "Girando…" : selected ? "Girar otra vez" : "Girar el reel"}</span>
          <ArrowIcon />
        </button>

        {selected && !isShuffling && (
          <div className="next-actions" aria-label="Siguiente paso">
            <button onClick={onResearch}><span className="action-number">15</span><span><strong>Investigar</strong><small>minutos</small></span></button>
            <button onClick={onSpeak}><span className="action-number">60</span><span><strong>Explicar</strong><small>segundos</small></span></button>
          </div>
        )}
      </div>
    </>
  );
}
