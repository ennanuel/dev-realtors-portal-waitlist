import { useCountdown } from "../../hooks/useCountdown";

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ to, label }: { to: Date; label: string }) {
  const { days, hours, minutes, seconds } = useCountdown(to);
  return (
    <div className="countdown" role="timer" aria-label={`Countdown to ${label}`}>
      <div>
        <b>{days}</b>
        <span>Days</span>
      </div>
      <div>
        <b>{pad(hours)}</b>
        <span>Hrs</span>
      </div>
      <div>
        <b>{pad(minutes)}</b>
        <span>Min</span>
      </div>
      <div>
        <b>{pad(seconds)}</b>
        <span className="countdown-blink">Sec</span>
      </div>
    </div>
  );
}
