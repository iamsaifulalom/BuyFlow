"use client"
import { useEffect, useState } from "react"

/**
 * @description React hook to detect whether the current screen width
 * is smaller than or equal to a given breakpoint.
 *
 * This hook listens to window resize changes using
 * `window.matchMedia` and updates automatically.
 *
 * @param {number} [width=1024] - Maximum screen width (in pixels)
 * considered as a "small screen".
 *
 * @returns {{
 *   isSmallScreen: boolean | undefined
 * }} An object containing the screen state:
 * - `true`  → screen width is <= given width
 * - `false` → screen width is greater than given width
 * - `undefined` → initial state before first evaluation
 *
 * @example
 * ```ts
 * const { isSmallScreen } = useSmallScreen(768)
 *
 * if (isSmallScreen) {
 *   console.log("Mobile or small device")
 * }
 * ```
 */

export function useSmallScreen(width: number = 1024) {
  // Start with undefined (safe for SSR)
  const [isSmallScreen, setIsSmallScreen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Now we are 100% on the client
    const mql = window.matchMedia(`(max-width: ${width}px)`);

    // Set initial value
    setIsSmallScreen(mql.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches);
    };

    mql.addEventListener("change", onChange);

    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [width]);

  return { isSmallScreen };
}

