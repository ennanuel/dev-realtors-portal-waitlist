import { useEffect, useState } from "react";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function partsUntil(target: Date): CountdownParts {
  let s = Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000));
  const days = Math.floor(s / 86_400);
  s -= days * 86_400;
  const hours = Math.floor(s / 3_600);
  s -= hours * 3_600;
  const minutes = Math.floor(s / 60);
  return { days, hours, minutes, seconds: s - minutes * 60 };
}

/** Ticks once a second until `target`, then stops at zero. */
export function useCountdown(target: Date) {
  const [parts, setParts] = useState(() => partsUntil(target));
  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(partsUntil(target));
      if (target.getTime() <= Date.now()) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);
  return parts;
}
