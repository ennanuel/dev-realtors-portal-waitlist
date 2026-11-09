import { useCallback, useEffect, useRef, useState } from "react";

/** Copies text and flips `copied` to true for a moment so the button can say "Copied". */
export function useCopy(resetAfter = 1600) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        /* clipboard can be blocked; still show feedback */
      }
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), resetAfter);
    },
    [resetAfter],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);
  return { copied, copy };
}
