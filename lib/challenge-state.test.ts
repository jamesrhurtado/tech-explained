import { describe, expect, it } from "vitest";
import {
  challengeReducer,
  initialChallengeState,
  RESEARCH_SECONDS,
  SPEAK_COUNTDOWN,
  SPEAK_SECONDS,
} from "@/lib/challenge-state";

describe("challenge state", () => {
  it("opens and resets research mode", () => {
    const opened = challengeReducer(initialChallengeState, { type: "OPEN_RESEARCH" });

    expect(opened).toEqual({
      mode: "research",
      timerStatus: "idle",
      seconds: RESEARCH_SECONDS,
      countdown: null,
    });
    expect(challengeReducer(opened, { type: "RESET_TIMER" })).toEqual(opened);
  });

  it("completes the explanation countdown before running the timer", () => {
    let state = challengeReducer(initialChallengeState, { type: "OPEN_SPEAK" });

    expect(state).toMatchObject({ seconds: SPEAK_SECONDS, countdown: SPEAK_COUNTDOWN });
    for (let index = 0; index < SPEAK_COUNTDOWN; index += 1) {
      state = challengeReducer(state, { type: "TICK_COUNTDOWN" });
    }

    expect(state).toMatchObject({ countdown: null, timerStatus: "running" });
  });

  it("stops at zero and cannot restart a completed timer", () => {
    const opened = challengeReducer(initialChallengeState, { type: "OPEN_RESEARCH" });
    if (opened.mode === "pick") throw new Error("Expected research mode");

    let state = opened;
    state = { ...state, timerStatus: "running", seconds: 1 };
    const done = challengeReducer(state, { type: "TICK_TIMER" });

    expect(done).toMatchObject({ seconds: 0, timerStatus: "done" });
    expect(challengeReducer(done, { type: "TOGGLE_TIMER" })).toEqual(done);
  });

  it("returns to a state without a background timer", () => {
    const running = challengeReducer(
      challengeReducer(initialChallengeState, { type: "OPEN_RESEARCH" }),
      { type: "TOGGLE_TIMER" },
    );

    expect(challengeReducer(running, { type: "RETURN_TO_PICK" })).toEqual(initialChallengeState);
  });
});
