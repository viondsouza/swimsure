/** SwimSure logo: a blue tile with two waves, plus the wordmark. */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#2a6fd6" />
      <path d="M6.5 13.5c3-3 6.5-3 9.5 0s6.5 3 9.5 0" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M6.5 20.5c3-3 6.5-3 9.5 0s6.5 3 9.5 0" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo ${light ? "light" : ""}`}>
      <LogoMark />
      <span>
        Swim<span className="logo-accent">Sure</span>
      </span>
    </span>
  );
}
