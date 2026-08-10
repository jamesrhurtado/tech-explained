import { ArrowIcon, PlayIcon } from "@/components/icons";
import { topicLengthClass } from "@/components/topic-reel";
import type { Concept } from "@/data/concepts";
import type { ChallengeState } from "@/lib/challenge-state";

type ActiveChallenge = Exclude<ChallengeState, { mode: "pick" }>;

type ChallengeTimerProps = {
  challenge: ActiveChallenge;
  selected: Concept | null;
  onBack: () => void;
  onNewTopic: () => void;
  onOpenSpeak: () => void;
  onReset: () => void;
  onToggle: () => void;
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export function ChallengeTimer({
  challenge,
  selected,
  onBack,
  onNewTopic,
  onOpenSpeak,
  onReset,
  onToggle,
}: ChallengeTimerProps) {
  const { mode, timerStatus, seconds, countdown } = challenge;
  const timerTone = mode === "speak" && seconds <= 5
    ? "danger"
    : mode === "speak" && seconds <= 15
      ? "warning"
      : "";

  return (
    <>
      <div className="timer-topline">
        <button className="back-button" onClick={onBack} aria-label="Volver a la selección">← Volver</button>
        <p className="eyebrow"><span /> {mode === "research" ? "Modo investigación" : "Modo explicación"}</p>
      </div>
      <h1 id="card-title" className={`timer-topic ${selected ? topicLengthClass(selected.name) : ""}`}>{selected?.name}</h1>

      {countdown !== null ? (
        <div className="countdown" aria-live="assertive"><span>{countdown}</span><small>Prepárate</small></div>
      ) : (
        <>
          <div className={`timer-display ${timerTone}`} aria-label={`${seconds} segundos restantes`}>
            <span>{formatTime(seconds)}</span>
            {mode === "speak" && timerStatus === "running" && <small>Habla</small>}
            {timerStatus === "done" && <small>{mode === "research" ? "Investigación terminada" : "Tiempo"}</small>}
          </div>

          <div className="timer-controls">
            {timerStatus !== "done" ? (
              <button className="primary-button compact" onClick={onToggle}>
                <PlayIcon paused={timerStatus !== "running"} />
                {timerStatus === "running" ? "Pausar" : timerStatus === "paused" ? "Continuar" : "Iniciar"}
              </button>
            ) : mode === "research" ? (
              <button className="primary-button compact" onClick={onOpenSpeak}>Ahora explícalo <ArrowIcon /></button>
            ) : (
              <button className="primary-button compact" onClick={onOpenSpeak}>Repetir el minuto</button>
            )}
            <button className="secondary-button" onClick={onReset}>Reiniciar</button>
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
      {mode === "speak" && timerStatus === "done" && (
        <button className="text-button" onClick={onNewTopic}>Elegir un nuevo concepto →</button>
      )}
    </>
  );
}
