import { Grid, PinInput, PinInputField } from "@chakra-ui/react";

interface Props {
  /** Digits in order. An empty box is stored as a space so later digits keep their position. */
  value: string;
  onChange(value: string): void;
  length?: number;
  invalid?: boolean;
  disabled?: boolean;
}

/** One box per digit. Supports typing, backspace, arrow keys and pasting the whole code. */
export function OtpInput({
  value,
  onChange,
  length = 6,
  invalid,
  disabled,
}: Props) {
  const digits = Array.from({ length }, (_, i) => (value[i] ?? "").trim());

  return (
    <Grid
      width="100%"
      gridTemplateColumns={`repeat(${length}, minmax(0, 1fr))`}
      gap="8px"
      role="group"
      aria-label={`${length} digit code`}
    >
      <PinInput
        value={value}
        isInvalid={invalid}
        isDisabled={disabled}
        onChange={(value) => {
          onChange(value);
        }}
      >
        {digits.map((_, i) => (
          <PinInputField
            key={i}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1}`}
            height="58px"
            border="1px solid transparent"
            borderRadius="var(--radius-sm)"
            background="var(--terracotta)"
            fontSize="22px"
            fontWeight="500"
            color="var(--cream)"
            width="100%"
            transition="border-color 0.15s"
            _focus={{
              outline: "none",
              borderColor: "var(--salmon)",
            }}
            _invalid={{
              borderColor: "var(--error-on-dark)",
            }}
          />
        ))}
      </PinInput>
    </Grid>
  );
}
