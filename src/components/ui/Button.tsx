import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingLabel?: string;
}

/** Full width primary button used across the signup steps. */
export function Button({ loading, loadingLabel, children, disabled, className = "", ...rest }: Props) {
  return (
    <button className={`btn ${className}`} disabled={disabled || loading} aria-busy={loading} {...rest}>
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {loading && loadingLabel ? loadingLabel : children}
    </button>
  );
}
