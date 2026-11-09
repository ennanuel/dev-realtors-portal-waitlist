import { useEffect, type RefObject } from "react";

type Reason = "outside" | "escape";

/** Calls `onDismiss` on a click outside `ref`, when focus moves outside it, or when Escape is pressed. */
export function useDismiss(
  ref: RefObject<HTMLElement>,
  active: boolean,
  onDismiss: (reason: Reason) => void,
) {
  useEffect(() => {
    if (!active) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onDismiss("outside");
    };
    const onFocus = (e: FocusEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onDismiss("outside");
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss("escape");
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref, active, onDismiss]);
}
