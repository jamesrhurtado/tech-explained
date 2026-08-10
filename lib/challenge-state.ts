export const RESEARCH_SECONDS = 15 * 60;
export const SPEAK_SECONDS = 60;
export const SPEAK_COUNTDOWN = 3;

export type TimerStatus = "idle" | "running" | "paused" | "done";

type PickState = {
  mode: "pick";
};

type ActiveChallengeState = {
  mode: "research" | "speak";
  timerStatus: TimerStatus;
  seconds: number;
  countdown: number | null;
};

export type ChallengeState = PickState | ActiveChallengeState;

export type ChallengeAction =
  | { type: "OPEN_RESEARCH" }
  | { type: "OPEN_SPEAK" }
  | { type: "RETURN_TO_PICK" }
  | { type: "TOGGLE_TIMER" }
  | { type: "RESET_TIMER" }
  | { type: "TICK_TIMER" }
  | { type: "TICK_COUNTDOWN" };

export const initialChallengeState: ChallengeState = { mode: "pick" };

function researchState(): ActiveChallengeState {
  return {
    mode: "research",
    timerStatus: "idle",
    seconds: RESEARCH_SECONDS,
    countdown: null,
  };
}

function speakState(): ActiveChallengeState {
  return {
    mode: "speak",
    timerStatus: "idle",
    seconds: SPEAK_SECONDS,
    countdown: SPEAK_COUNTDOWN,
  };
}

export function challengeReducer(
  state: ChallengeState,
  action: ChallengeAction,
): ChallengeState {
  switch (action.type) {
    case "OPEN_RESEARCH":
      return researchState();
    case "OPEN_SPEAK":
      return speakState();
    case "RETURN_TO_PICK":
      return initialChallengeState;
    case "TOGGLE_TIMER":
      if (state.mode === "pick" || state.timerStatus === "done" || state.countdown !== null) {
        return state;
      }
      return {
        ...state,
        timerStatus: state.timerStatus === "running" ? "paused" : "running",
      };
    case "RESET_TIMER":
      if (state.mode === "pick") return state;
      return state.mode === "research" ? researchState() : speakState();
    case "TICK_TIMER":
      if (state.mode === "pick" || state.timerStatus !== "running" || state.countdown !== null) {
        return state;
      }
      if (state.seconds <= 1) {
        return { ...state, seconds: 0, timerStatus: "done" };
      }
      return { ...state, seconds: state.seconds - 1 };
    case "TICK_COUNTDOWN":
      if (state.mode !== "speak" || state.countdown === null) return state;
      if (state.countdown <= 1) {
        return { ...state, countdown: null, timerStatus: "running" };
      }
      return { ...state, countdown: state.countdown - 1 };
  }
}
