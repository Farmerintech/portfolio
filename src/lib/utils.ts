import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deterministic 32-bit string hash (FNV-1a).
 * Used to derive stable per-project gradients/patterns so the generated
 * covers look designed but never change between renders or server/client.
 */
export function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** True for the placeholder markers left in src/lib/data.ts ("[TODO: ...]"). */
export function isPlaceholder(text: string): boolean {
  return text.includes("[TODO");
}
