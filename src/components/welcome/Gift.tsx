import { SparkleIcon } from "../ui/icons";

/** Wrapped present whose lid pops open now and then, with sparkles escaping. */
export function Gift() {
  return (
    <div className="gift">
      <span className="gift-sparkle" style={{ marginLeft: -9 }}>
        <SparkleIcon size={18} color="var(--paper)" />
      </span>
      <span className="gift-sparkle" style={{ marginLeft: -34, animationDelay: "1.75s" }}>
        <SparkleIcon size={12} color="var(--ink)" />
      </span>
      <span className="gift-sparkle" style={{ marginLeft: 18, animationDelay: "1.85s" }}>
        <SparkleIcon size={14} color="var(--sand)" />
      </span>
      <svg className="gift-box" viewBox="0 0 320 340" aria-hidden="true">
        <rect x="30" y="140" width="260" height="190" rx="4" className="gift-paper" />
        <rect x="140" y="140" width="40" height="190" className="gift-ribbon" />
        <rect x="30" y="156" width="260" height="10" className="gift-shade" />
        <g className="gift-lid">
          <rect x="18" y="100" width="284" height="56" rx="4" className="gift-lid-top" />
          <rect x="140" y="100" width="40" height="56" className="gift-ribbon" />
          <path
            d="M160 100c-30-60-100-60-90-20 6 24 60 22 90 20z"
            fill="none"
            className="gift-bow"
            strokeWidth="16"
            strokeLinejoin="round"
          />
          <path
            d="M160 100c30-60 100-60 90-20-6 24-60 22-90 20z"
            fill="none"
            className="gift-bow"
            strokeWidth="16"
            strokeLinejoin="round"
          />
          <circle cx="160" cy="100" r="16" className="gift-ribbon" />
        </g>
      </svg>
    </div>
  );
}
