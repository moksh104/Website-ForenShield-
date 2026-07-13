import { useEffect, useState } from "react";

/**
 * Detects whether the current device should run in a "low-power" visual mode.
 *
 * Triggers when ANY of the following is true:
 *   - User has `prefers-reduced-motion: reduce`
 *   - Device has very limited CPU concurrency (<= 4 logical cores)
 *   - Device reports low memory (<= 4 GB via navigator.deviceMemory)
 *   - The Save-Data client hint is enabled, or the effective connection
 *     is 2g / slow-2g
 *
 * Components should use this to skip continuous animations (scan lines,
 * data-flow gradients, ping rings, blinking dots, staggered fade-ins).
 */
export function useLowPower(): boolean {
  const [low, setLow] = useState<boolean>(() => detect());

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setLow(detect());
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return low;
}

function detect(): boolean {
  if (typeof window === "undefined") return false;

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: {
      saveData?: boolean;
      effectiveType?: string;
    };
  };

  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4) {
    return true;
  }

  if (typeof nav.deviceMemory === "number" && nav.deviceMemory > 0 && nav.deviceMemory <= 4) {
    return true;
  }

  const c = nav.connection;
  if (c?.saveData) return true;
  if (c?.effectiveType && /^(slow-2g|2g)$/.test(c.effectiveType)) return true;

  return false;
}
