import { COUNTRY_CALLING_CODES } from "@/constants/country";
import { formatPhone } from "../../lib/format";
import { useEffect } from "react";

interface Props {
  countryCode: string;
  number: string;
  onCountryCodeChange(code: string): void;
  onNumberChange(number: string): void;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
  error?: string;
}

/** Country code picker plus a number that spaces itself as you type. */
export function PhoneField({
  countryCode,
  number,
  name = "phone",
  onBlur,
  onCountryCodeChange,
  onNumberChange,
  error,
}: Props) {
  useEffect(() => {
    if (!countryCode) {
      onCountryCodeChange(
        COUNTRY_CALLING_CODES?.find((c) => c.label == "Nigeria")?.code ??
          "+234",
      );
    }
  }, [countryCode]);

  return (
    <div className={`field ${error ? "is-invalid" : ""}`}>
      <label htmlFor="phone">Phone number</label>
      <div className="phone" style={{ padding: "0" }}>
        <select
          aria-label="Country code"
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value)}
        >
          {COUNTRY_CALLING_CODES.map((c) => (
            <option key={c.code} value={c.code} title={c.label}>
              {c.code}
            </option>
          ))}
        </select>
        <input
          id="phone"
          type="tel"
          name={name}
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="803 000 0000"
          value={number}
          onChange={(e) => onNumberChange(formatPhone(e.target.value))}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "phone-error" : "phone-hint"}
        />
      </div>
      {error ? (
        <span className="field-error" id="phone-error">
          {error}
        </span>
      ) : (
        <span className="field-hint" id="phone-hint">
          For client alerts on WhatsApp. Never shown to buyers.
        </span>
      )}
    </div>
  );
}
