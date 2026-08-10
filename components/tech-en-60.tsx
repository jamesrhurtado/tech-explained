"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { categories, concepts, type Category, type Concept } from "@/data/concepts";

type Mode = "pick" | "research" | "speak";
type TimerState = "idle" | "running" | "paused" | "done";

const RESEARCH_SECONDS = 15 * 60;
const SPEAK_SECONDS = 60;
const REEL_LENGTH = 11;
const REEL_DURATION = 1120;

const categoryLabels: Record<Category, string> = {
  Todos: "Todos",
  "Inteligencia Artificial": "IA",
  "Ingeniería de software": "Software",
  "Git y GitHub": "Git / GitHub",
};

function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function randomFrom(items: Concept[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function topicLengthClass(name: string) {
  if (name.length >= 27) return "is-long";
  if (name.length >= 20) return "is-medium";
  return "";
}

function buildReel(items: Concept[], current: Concept | null, winner: Concept) {
  const reel: Concept[] = [];
  const firstPool = items.filter((item) => item.name !== winner.name);
  reel.push(current && current.name !== winner.name ? current : randomFrom(firstPool.length ? firstPool : items));

  while (reel.length < REEL_LENGTH - 1) {
    const previous = reel[reel.length - 1];
    const pool = items.filter((item) => item.name !== previous.name && item.name !== winner.name);
    reel.push(randomFrom(pool.length ? pool : items));
  }

  reel.push(winner);
  return reel;
}

function TopicTitle({ concept }: { concept: Concept | null }) {
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

function TopicReel({ items }: { items: Concept[] }) {
  const stop = items.length > 0 ? ((items.length - 1) / (items.length + 2)) * 100 : 0;

  return (
    <div className="reel-window" aria-hidden="true">
      <div
        className="reel-track"
        style={{ "--reel-stop": `-${stop}%` } as React.CSSProperties}
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

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="none">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><path d="M6 4.5 15 10l-9 5.5v-11Z" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><path d="M5.5 4h3v12h-3V4Zm6 0h3v12h-3V4Z" /></svg>
  );
}

export function TechEn60() {
  const [category, setCategory] = useState<Category>("Todos");
  const [selected, setSelected] = useState<Concept | null>(null);
  const [displayed, setDisplayed] = useState<Concept | null>(null);
  const [reelItems, setReelItems] = useState<Concept[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [mode, setMode] = useState<Mode>("pick");
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [seconds, setSeconds] = useState(RESEARCH_SECONDS);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const shuffleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = useMemo(
    () => category === "Todos" ? concepts : concepts.filter((item) => item.category === category),
    [category],
  );

  useEffect(() => {
    const storage = getLocalStorage();
    const savedCategory = storage?.getItem("tech60-category") as Category | null;
    const savedConcept = storage?.getItem("tech60-concept");
    const frame = requestAnimationFrame(() => {
      if (savedCategory && categories.includes(savedCategory)) setCategory(savedCategory);
      if (savedConcept) {
        const match = concepts.find((item) => item.name === savedConcept);
        if (match) { setSelected(match); setDisplayed(match); }
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    getLocalStorage()?.setItem("tech60-category", category);
  }, [category]);

  useEffect(() => {
    if (mode === "pick" || timerState !== "running" || countdown !== null) return;
    const interval = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          window.clearInterval(interval);
          setTimerState("done");
          setAnnouncement(mode === "research" ? "Investigación terminada" : "Tiempo");
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerState, countdown, mode]);

  const pickTopic = useCallback(() => {
    if (isShuffling) return;
    const candidates = filtered.filter((item) => item.name !== selected?.name);
    const pool = candidates.length ? candidates : filtered;
    const next = randomFrom(pool);

    setMode("pick");

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setSelected(next);
      setDisplayed(next);
      setAnnouncement(`Concepto seleccionado: ${next.name}`);
      getLocalStorage()?.setItem("tech60-concept", next.name);
      return;
    }

    setReelItems(buildReel(filtered, displayed, next));
    setIsShuffling(true);
    shuffleRef.current = setTimeout(() => {
      setSelected(next);
      setDisplayed(next);
      setIsShuffling(false);
      setReelItems([]);
      setAnnouncement(`Concepto seleccionado: ${next.name}`);
      getLocalStorage()?.setItem("tech60-concept", next.name);
      shuffleRef.current = null;
    }, REEL_DURATION);
  }, [displayed, filtered, isShuffling, selected]);

  const openResearch = useCallback(() => {
    setMode("research");
    setSeconds(RESEARCH_SECONDS);
    setTimerState("idle");
    setCountdown(null);
  }, []);

  const openSpeak = useCallback(() => {
    setMode("speak");
    setSeconds(SPEAK_SECONDS);
    setTimerState("idle");
    setCountdown(3);
  }, []);

  const returnToPick = useCallback(() => {
    setMode("pick");
    setTimerState("idle");
    setCountdown(null);
  }, []);

  useEffect(() => {
    if (mode !== "speak" || countdown === null) return;
    const interval = window.setInterval(() => {
      setCountdown((value) => {
        if (value === null || value <= 1) {
          window.clearInterval(interval);
          setTimerState("running");
          return null;
        }
        return value - 1;
      });
    }, 850);
    return () => window.clearInterval(interval);
  }, [mode, countdown]);

  const toggleTimer = useCallback(() => {
    if (timerState === "done") return;
    setTimerState((state) => state === "running" ? "paused" : "running");
  }, [timerState]);

  const resetTimer = useCallback(() => {
    setSeconds(mode === "research" ? RESEARCH_SECONDS : SPEAK_SECONDS);
    setTimerState("idle");
    setCountdown(mode === "speak" ? 3 : null);
  }, [mode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isControl = ["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA"].includes(target.tagName);
      if (event.key === "Escape" && mode !== "pick") returnToPick();
      if (event.code === "Space" && mode !== "pick" && !isControl && countdown === null) {
        event.preventDefault();
        toggleTimer();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode, countdown, returnToPick, toggleTimer]);

  useEffect(() => () => { if (shuffleRef.current) clearTimeout(shuffleRef.current); }, []);

  const changeCategory = (next: Category) => {
    if (shuffleRef.current) clearTimeout(shuffleRef.current);
    shuffleRef.current = null;
    setCategory(next);
    setMode("pick");
    setSelected(null);
    setDisplayed(null);
    setReelItems([]);
    setIsShuffling(false);
    getLocalStorage()?.removeItem("tech60-concept");
  };

  const timerTone = mode === "speak" && seconds <= 5 ? "danger" : mode === "speak" && seconds <= 15 ? "warning" : "";

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
            <>
              <div className="card-heading">
                <p className="eyebrow">Concepto / {categoryLabels[category]}</p>
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
                <button className="primary-button shuffle-button" onClick={pickTopic} disabled={isShuffling}>
                  <span>{isShuffling ? "Girando…" : selected ? "Girar otra vez" : "Girar el reel"}</span>
                  <ArrowIcon />
                </button>

                {selected && !isShuffling && (
                  <div className="next-actions" aria-label="Siguiente paso">
                    <button onClick={openResearch}><span className="action-number">15</span><span><strong>Investigar</strong><small>minutos</small></span></button>
                    <button onClick={openSpeak}><span className="action-number">60</span><span><strong>Explicar</strong><small>segundos</small></span></button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="timer-topline">
                <button className="back-button" onClick={returnToPick} aria-label="Volver a la selección">← Volver</button>
                <p className="eyebrow"><span /> {mode === "research" ? "Modo investigación" : "Modo explicación"}</p>
              </div>
              <h1 id="card-title" className={`timer-topic ${selected ? topicLengthClass(selected.name) : ""}`}>{selected?.name}</h1>

              {countdown !== null ? (
                <div className="countdown" aria-live="assertive"><span>{countdown}</span><small>Prepárate</small></div>
              ) : (
                <>
                  <div className={`timer-display ${timerTone}`} aria-label={`${seconds} segundos restantes`}>
                    <span>{formatTime(seconds)}</span>
                    {mode === "speak" && timerState === "running" && <small>Habla</small>}
                    {timerState === "done" && <small>{mode === "research" ? "Investigación terminada" : "Tiempo"}</small>}
                  </div>

                  <div className="timer-controls">
                    {timerState !== "done" ? (
                      <button className="primary-button compact" onClick={toggleTimer}>
                        <PlayIcon paused={timerState !== "running"} />
                        {timerState === "running" ? "Pausar" : timerState === "paused" ? "Continuar" : "Iniciar"}
                      </button>
                    ) : mode === "research" ? (
                      <button className="primary-button compact" onClick={openSpeak}>Ahora explícalo <ArrowIcon /></button>
                    ) : (
                      <button className="primary-button compact" onClick={openSpeak}>Repetir el minuto</button>
                    )}
                    <button className="secondary-button" onClick={resetTimer}>Reiniciar</button>
                  </div>
                </>
              )}

              <div className="guide">
                <p>Guía rápida</p>
                <ol>
                  {(mode === "research"
                    ? ["¿Qué es?", "¿Qué problema resuelve?", "¿Cuál es el mejor ejemplo?"]
                    : ["Qué es", "Por qué importa", "Un ejemplo"]
                  ).map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}
                </ol>
              </div>
              {mode === "speak" && timerState === "done" && (
                <button className="text-button" onClick={pickTopic}>Elegir un nuevo concepto →</button>
              )}
            </>
          )}
        </section>

        <div className="utility-note" aria-hidden="true">
          <span>Investiga. Entiende. Explícalo.</span><span className="rule" /><span>Sin guiones</span>
        </div>
        <p className="sr-only" aria-live="polite">{announcement}</p>
      </div>
    </main>
  );
}
