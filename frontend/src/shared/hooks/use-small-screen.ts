import { useEffect, useState } from "react"

/**
 * React hook to detect whether the current screen width
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
  // Initialize state using a function to avoid synchronous setState in effect
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false; // SSR-safe
    return window.matchMedia(`(max-width: ${width}px)`).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${width}px)`);

    // Listener for screen size changes
    const onChange = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches);
    };

    mql.addEventListener("change", onChange);

    // Cleanup listener on unmount or width change
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [width]);

  return { isSmallScreen };
}
