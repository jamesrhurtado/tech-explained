export function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="none">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><path d="M6 4.5 15 10l-9 5.5v-11Z" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><path d="M5.5 4h3v12h-3V4Zm6 0h3v12h-3V4Z" /></svg>
  );
}
