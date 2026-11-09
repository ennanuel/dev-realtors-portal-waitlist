import { config } from "@/constants/config";
import { Countdown } from "./Countdown";
import { Gift } from "./Gift";

/** The "Admit one" ticket with the live countdown to the surprise event. */
export function EventTicket() {
  return (
    <div className="ticket-drop">
      <div className="ticket">
        <div className="ticket-main">
          <span className="ticket-shine" aria-hidden="true" />
          <span className="ticket-admit">Admit one. {config.brandName}</span>
          <b className="ticket-title">
            <span className="ticket-hush">Shh.</span>
            <br />
            {config.event.label}
          </b>
          <span className="ticket-sub">
            The surprise is revealed at the event. This ticket is yours.
          </span>
          <Countdown to={config.event.date} label={config.event.longLabel} />
        </div>
        <div className="ticket-perforation" aria-hidden="true" />
        <div className="ticket-stub">
          <Gift />
        </div>
      </div>
    </div>
  );
}
