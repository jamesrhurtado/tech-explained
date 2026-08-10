"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { ChallengeTimer } from "@/components/challenge-timer";
import { TopicPicker } from "@/components/topic-picker";
import { categories, concepts, type Category, type Concept } from "@/data/concepts";
import {
  challengeReducer,
  initialChallengeState,
} from "@/lib/challenge-state";
import {
  clearPersistedConcept,
  getBrowserStorage,
  persistCategory,
  persistConcept,
  readPersistedSelection,
} from "@/lib/persisted-selection";
import { buildReel, randomFrom } from "@/lib/topic-selection";

const REEL_LENGTH = 11;
const REEL_DURATION = 1120;

const categoryLabels: Record<Category, string> = {
  Todos: "Todos",
  "Inteligencia Artificial": "IA",
  "Ingeniería de software": "Software",
  "Git y GitHub": "Git / GitHub",
};

export function TechEn60() {
  const [category, setCategory] = useState<Category>("Todos");
  const [selected, setSelected] = useState<Concept | null>(null);
  const [displayed, setDisplayed] = useState<Concept | null>(null);
  const [reelItems, setReelItems] = useState<Concept[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [challenge, dispatchChallenge] = useReducer(
    challengeReducer,
    initialChallengeState,
  );
  const shuffleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistenceReadyRef = useRef(false);

  const filtered = useMemo(
    () => category === "Todos"
      ? concepts
      : concepts.filter((item) => item.category === category),
    [category],
  );

  useEffect(() => {
    const restored = readPersistedSelection(getBrowserStorage());
    const frame = requestAnimationFrame(() => {
      setCategory(restored.category);
      if (restored.concept) {
        setSelected(restored.concept);
        setDisplayed(restored.concept);
      }
      persistenceReadyRef.current = true;
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!persistenceReadyRef.current) return;
    persistCategory(getBrowserStorage(), category);
  }, [category]);

  const timerIsRunning = challenge.mode !== "pick"
    && challenge.timerStatus === "running"
    && challenge.countdown === null;

  useEffect(() => {
    if (!timerIsRunning) return;
    const interval = window.setInterval(() => {
      dispatchChallenge({ type: "TICK_TIMER" });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerIsRunning]);

  const countdown = challenge.mode === "speak" ? challenge.countdown : null;

  useEffect(() => {
    if (countdown === null) return;
    const timeout = window.setTimeout(() => {
      dispatchChallenge({ type: "TICK_COUNTDOWN" });
    }, 850);
    return () => window.clearTimeout(timeout);
  }, [countdown]);

  const completedMode = challenge.mode !== "pick" && challenge.timerStatus === "done"
    ? challenge.mode
    : null;

  const pickTopic = useCallback(() => {
    if (isShuffling) return;
    const candidates = filtered.filter((item) => item.name !== selected?.name);
    const pool = candidates.length ? candidates : filtered;
    const next = randomFrom(pool);

    dispatchChallenge({ type: "RETURN_TO_PICK" });

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setSelected(next);
      setDisplayed(next);
      setAnnouncement(`Concepto seleccionado: ${next.name}`);
      persistConcept(getBrowserStorage(), next);
      return;
    }

    setReelItems(buildReel(filtered, displayed, next, REEL_LENGTH));
    setIsShuffling(true);
    shuffleRef.current = setTimeout(() => {
      setSelected(next);
      setDisplayed(next);
      setIsShuffling(false);
      setReelItems([]);
      setAnnouncement(`Concepto seleccionado: ${next.name}`);
      persistConcept(getBrowserStorage(), next);
      shuffleRef.current = null;
    }, REEL_DURATION);
  }, [displayed, filtered, isShuffling, selected]);

  const openResearch = useCallback(() => {
    dispatchChallenge({ type: "OPEN_RESEARCH" });
  }, []);

  const openSpeak = useCallback(() => {
    dispatchChallenge({ type: "OPEN_SPEAK" });
  }, []);

  const returnToPick = useCallback(() => {
    dispatchChallenge({ type: "RETURN_TO_PICK" });
  }, []);

  const toggleTimer = useCallback(() => {
    dispatchChallenge({ type: "TOGGLE_TIMER" });
  }, []);

  const resetTimer = useCallback(() => {
    dispatchChallenge({ type: "RESET_TIMER" });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isControl = ["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA"].includes(target.tagName);
      if (event.key === "Escape" && challenge.mode !== "pick") returnToPick();
      if (event.code === "Space" && challenge.mode !== "pick" && !isControl && countdown === null) {
        event.preventDefault();
        toggleTimer();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [challenge.mode, countdown, returnToPick, toggleTimer]);

  useEffect(() => () => {
    if (shuffleRef.current) clearTimeout(shuffleRef.current);
  }, []);

  const changeCategory = (next: Category) => {
    if (shuffleRef.current) clearTimeout(shuffleRef.current);
    shuffleRef.current = null;
    setCategory(next);
    dispatchChallenge({ type: "RETURN_TO_PICK" });
    setSelected(null);
    setDisplayed(null);
    setReelItems([]);
    setIsShuffling(false);
    clearPersistedConcept(getBrowserStorage());
  };

  const mode = challenge.mode;

  return (
    <main className="app-shell">
      <div className="ambient" aria-hidden="true" />
      <div className="page-frame">
        <header className="site-header">
          <a className="wordmark" href="#main-card" aria-label="Tech en 60, inicio">Tech en <span>60</span></a>
          <p>Gira · Aprende · Cuenta</p>
        </header>

        {mode === "pick" && (
          <nav className="category-scroll" aria-label="Categorías de conceptos">
            {categories.map((item) => (
              <button key={item} className="category-pill" aria-pressed={category === item} onClick={() => changeCategory(item)}>
                {item}
              </button>
            ))}
          </nav>
        )}

        <section id="main-card" className={`main-card ${mode !== "pick" ? "timer-card" : ""}`} aria-labelledby="card-title">
          <div className="corner-mark" aria-hidden="true">{mode === "pick" ? "01" : mode === "research" ? "02" : "03"}</div>

          {mode === "pick" ? (
            <TopicPicker
              categoryLabel={categoryLabels[category]}
              displayed={displayed}
              filtered={filtered}
              isShuffling={isShuffling}
              reelItems={reelItems}
              selected={selected}
              onPick={pickTopic}
              onResearch={openResearch}
              onSpeak={openSpeak}
            />
          ) : (
            <ChallengeTimer
              challenge={challenge}
              selected={selected}
              onBack={returnToPick}
              onNewTopic={pickTopic}
              onOpenSpeak={openSpeak}
              onReset={resetTimer}
              onToggle={toggleTimer}
            />
          )}
        </section>

        <div className="utility-note" aria-hidden="true">
          <span>Investiga. Entiende. Explícalo.</span><span className="rule" /><span>Sin guiones</span>
        </div>
        <p className="sr-only" aria-live="polite">
          {completedMode
            ? completedMode === "research" ? "Investigación terminada" : "Tiempo"
            : announcement}
        </p>
      </div>
    </main>
  );
}
