import { useEffect, useRef, useState } from "react";

const TIMER_DURATION = 120;

export type TimerOptions = {
  autoStart?: boolean;
};

const convertMSToSeconds = (ms: number) => Math.round(ms / 1000);

export default function useTimer(
  duration = TIMER_DURATION,
  options: TimerOptions = {},
) {
  const { autoStart = true } = options;

  const timeOfStart = useRef<Date | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState(duration);
  const startTimer = () => {
    stopTimer();
    timeOfStart.current = new Date();

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (!timeOfStart.current) {
          stopTimer();
          return prev;
        }
        const timeElapsedInSeconds = convertMSToSeconds(
          Date.now() - timeOfStart.current.getTime(),
        );
        const newTimer = duration - timeElapsedInSeconds;
        if (!newTimer) stopTimer();
        return newTimer;
      });
    }, 200);
  };
  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeOfStart.current = null;
  };
  const resetTimer = () => {
    setTimer(duration);
    startTimer();
  };

  useEffect(() => {
    if (!autoStart) return;
    startTimer();

    return stopTimer;
  }, [autoStart]);

  return {
    count: timer,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
  };
}
