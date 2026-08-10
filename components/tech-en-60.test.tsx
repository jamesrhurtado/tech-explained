import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TechEn60 } from "@/components/tech-en-60";

describe("TechEn60", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.localStorage.clear();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("selects a topic and completes the explanation countdown", () => {
    render(<TechEn60 />);
    act(() => vi.runOnlyPendingTimers());

    fireEvent.click(screen.getByRole("button", { name: "Girar el reel" }));
    expect(screen.getByRole("button", { name: /Investigar/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Explicar/ }));
    expect(screen.getByText("Prepárate")).toBeInTheDocument();

    for (let index = 0; index < 3; index += 1) {
      act(() => vi.advanceTimersByTime(850));
    }

    expect(screen.getByText("01:00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pausar" })).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("00:59")).toBeInTheDocument();
  });
});
