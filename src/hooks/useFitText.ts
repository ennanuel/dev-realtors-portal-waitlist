import { useLayoutEffect, useRef } from "react";

/**
 * Scales an element's font size so its text spans the full width of its parent.
 * Used for the big wordmark at the bottom of the page.
 */
export function useFitText<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !el.parentElement) return;
    const parent = el.parentElement;

    const fit = () => {
      el.style.fontSize = "100px";
      const width = el.getBoundingClientRect().width;
      if (width) el.style.fontSize = `${(100 * parent.clientWidth) / width}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, []);

  return ref;
}
