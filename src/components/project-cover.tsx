import { cn, hashString } from "@/lib/utils";

/**
 * Generative project artwork.
 *
 * There are no image assets in /public, so rather than ship empty gradient
 * boxes every cover is drawn as SVG, derived deterministically from the
 * project name: the same project always gets the same colours and the same
 * composition, on the server and the client alike.
 *
 * Colours come from a curated palette list rather than a hue rotation of the
 * brand gradient — rotating freely can land on muddy or clashing pairs, and a
 * fixed set guarantees every card stays on-brand.
 */

const PALETTES: [string, string][] = [
  ["#7C3AED", "#DB2777"],
  ["#DB2777", "#F59E0B"],
  ["#0EA5E9", "#7C3AED"],
  ["#F59E0B", "#EC4899"],
  ["#10B981", "#0EA5E9"],
  ["#8B5CF6", "#F472B6"],
];

const VARIANTS = ["mesh", "grid", "waves", "rings"] as const;
type Variant = (typeof VARIANTS)[number];

/** Small deterministic PRNG (mulberry32) so shapes never shift between renders. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 400;
const H = 225;

export default function ProjectCover({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const h = hashString(name);
  const [c1, c2] = PALETTES[h % PALETTES.length];
  const variant: Variant = VARIANTS[(h >>> 5) % VARIANTS.length];
  const rand = mulberry32(h);

  // Deterministic ids — random ones would mismatch between server and client.
  const gid = `pc-grad-${(h % 46656).toString(36)}`;
  const fid = `pc-blur-${(h % 46656).toString(36)}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id={fid} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#${gid})`} opacity="0.9" />
      <rect width={W} height={H} fill="#000" opacity="0.18" />

      {variant === "mesh" &&
        Array.from({ length: 5 }, (_, i) => (
          <circle
            key={i}
            cx={rand() * W}
            cy={rand() * H}
            r={50 + rand() * 80}
            fill={i % 2 ? c1 : c2}
            opacity={0.45 + rand() * 0.35}
            filter={`url(#${fid})`}
          />
        ))}

      {variant === "grid" && (
        <g stroke="#fff" strokeWidth="1" opacity="0.3">
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`v${i}`} x1={(i * W) / 10} y1={0} x2={(i * W) / 10} y2={H} />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={(i * H) / 6} x2={W} y2={(i * H) / 6} />
          ))}
          {Array.from({ length: 4 }, (_, i) => {
            const cx = Math.floor(rand() * 10) * (W / 10);
            const cy = Math.floor(rand() * 6) * (H / 6);
            return (
              <rect
                key={`c${i}`}
                x={cx}
                y={cy}
                width={W / 10}
                height={H / 6}
                fill="#fff"
                opacity={0.25 + rand() * 0.35}
                stroke="none"
              />
            );
          })}
        </g>
      )}

      {variant === "waves" && (
        <g fill="none" strokeWidth="2.5" opacity="0.55">
          {Array.from({ length: 5 }, (_, i) => {
            const y = 30 + i * 42 + rand() * 14;
            const amp = 14 + rand() * 26;
            return (
              <path
                key={i}
                d={`M -20 ${y} C 80 ${y - amp}, 160 ${y + amp}, 240 ${y} S 380 ${y - amp}, 420 ${y}`}
                stroke={i % 2 ? "#fff" : c1}
                opacity={0.35 + rand() * 0.5}
              />
            );
          })}
        </g>
      )}

      {variant === "rings" && (
        <g fill="none">
          {Array.from({ length: 7 }, (_, i) => (
            <circle
              key={i}
              cx={W * (0.62 + rand() * 0.2)}
              cy={H * (0.3 + rand() * 0.3)}
              r={26 + i * 34}
              stroke={i % 2 ? "#fff" : c2}
              strokeWidth={1.5 + rand() * 2}
              opacity={0.25 + rand() * 0.4}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
