import { config } from "@/constants/config";
import { useFitText } from "../../hooks/useFitText";

/** The giant brand word at the bottom of the welcome page, stretched edge to edge. */
export function Wordmark() {
  const ref = useFitText<HTMLSpanElement>();
  return (
    <div className="wordmark" aria-hidden="true">
      <span ref={ref}>{config.wordmark}</span>
    </div>
  );
}
