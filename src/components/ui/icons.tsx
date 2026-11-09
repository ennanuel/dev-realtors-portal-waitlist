/** Small inline icons. Decorative, so they're hidden from screen readers. */

const base = { width: 18, height: 18, viewBox: "0 0 20 20", fill: "none", "aria-hidden": true } as const;

export const DocumentIcon = () => (
  <svg {...base}>
    <path d="M5 2.5h7l3.5 3.5v11.5H5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M8 9.5h5M8 12.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const LockIcon = ({ size = 18 }: { size?: number }) => (
  <svg {...base} width={size} height={size}>
    <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M7 9V6.5a3 3 0 0 1 6 0V9" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const LogoutIcon = () => (
  <svg {...base}>
    <path
      d="M8 4H4v12h4M13 6l4 4-4 4M17 10H8"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
  </svg>
);

export const SparkleIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" style={{ fill: color }} />
  </svg>
);
