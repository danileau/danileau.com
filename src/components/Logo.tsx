/**
 * Wordmark and icon for danileau.com.
 *
 * Built on the structure of the ciphra mark: a rounded tile, a group rotated
 * 8 degrees off true, and strokes with round caps crossing at one centre in
 * graduated widths. ciphra uses three strokes; this uses four, one per phase
 * of the path — development, engineering, operations, architecture — all
 * meeting at the same point, which is the argument the site makes anyway.
 *
 * The 8 degrees is the part worth keeping. Dead-on axes read as generated;
 * a mark tipped slightly off reads as set by hand.
 */

type LogoProps = {
  /** Edge length in px. The corner radius scales with it, as in the source mark. */
  size?: number;
  className?: string;
};

/** Descending, like ciphra's 21.5 / 17.4 / 15.4 — the foundation is heaviest. */
const STROKES = [
  { angle: 0, width: 22 },
  { angle: 45, width: 19 },
  { angle: 90, width: 16.5 },
  { angle: 135, width: 14.5 },
];

const REACH = 112.64; // half-length of the longest stroke, from the ciphra mark

export const LogoIcon = ({ size = 32, className }: LogoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    className={className}
    role="img"
    aria-label="Danileau"
  >
    <rect width="512" height="512" rx="110" className="fill-primary" />
    <g
      transform="translate(256,256) rotate(8)"
      stroke="hsl(var(--primary-foreground))"
      strokeLinecap="round"
      fill="none"
    >
      {STROKES.map(({ angle, width }) => {
        const rad = (angle * Math.PI) / 180;
        const x = REACH * Math.cos(rad);
        const y = REACH * Math.sin(rad);
        return (
          <path
            key={angle}
            d={`M ${-x} ${-y} L ${x} ${y}`}
            strokeWidth={width}
          />
        );
      })}
    </g>
  </svg>
);

export const Wordmark = ({ size = 30, className }: LogoProps) => (
  <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
    <LogoIcon size={size} />
    <span className="font-display text-xl tracking-tight">
      Danileau<span className="text-primary">.</span>
    </span>
  </span>
);

export default LogoIcon;
