import { AgentDownline, fetchAgentDownline } from "@/api/downline";
import { useEffect, useState } from "react";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; members: AgentDownline[] };

export function useDownline() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });
    fetchAgentDownline()
      .then((res) => {
        const members = res.downline;
        if (!cancelled) setState({ status: "ready", members });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ status: "error", message: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  return { ...state, retry: () => setAttempt((n) => n + 1) };
}
