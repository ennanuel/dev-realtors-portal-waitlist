import { useMemo, type FormEvent } from "react";
import { config } from "@/constants/config";
import { formatPhone, fullName, phoneDigits } from "../../lib/format";
import { Button } from "../ui/Button";
import { LockIcon } from "../ui/icons";
import { PhoneField } from "./PhoneField";
import { useFormik } from "formik";
import { AuthUser, Inviter } from "@/api/types";

import { object as YupObject, string as YupString } from "yup";
import { useMutation } from "@tanstack/react-query";
import { realtorSignUp } from "@/api/auth";
import { useToast } from "@chakra-ui/react";
import { COUNTRY_CALLING_CODES } from "@/constants/country";

interface Props {
  email: string;
  inviter: Inviter | null;
  referralCode: string;
  onCreated(user: AuthUser & { token: string }): void;
  onChangeEmail(): void;
}

type DetailFormValues = {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
};

type Field = keyof DetailFormValues;
type Errors = Partial<Record<Field | "form", string>>;

/** "+234" and "0803 112 4410" -> "+234 803 112 4410" (the trunk 0 is dropped after a country code). */
const internationalNumber = (countryCode: string, local: string) =>
  `${countryCode} ${formatPhone(phoneDigits(local).replace(/^0/, ""))}`;

/** Step 3 (new emails only): name and phone, then create the account. */
export function DetailsStep({
  email,
  inviter,
  referralCode,
  onCreated,
  onChangeEmail,
}: Props) {
  const toast = useToast();

  const validationSchema = YupObject().shape({
    firstName: YupString()
      .required("First name is required")
      .min(2, "First name is too short"),
    lastName: YupString()
      .required("Last name is required")
      .min(2, "Last name is too short"),
    country: YupString().required("Country is required"),
    phone: YupString().required("Phone number is required"),
  });
  const formik = useFormik<DetailFormValues>({
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      phone: "",
    },
    onSubmit(values) {
      mutateSubmit({
        email,
        first_name: values.firstName,
        last_name: values.lastName,
        country: values.country,
        phone: values.phone,
        referral_id: referralCode,
      });
    },
  });

  const countryCode = useMemo(
    () =>
      COUNTRY_CALLING_CODES.find((c) => c.label === formik.values.country)
        ?.code ?? "",
    [formik.values.country],
  );

  const selectCountryCode = (countryCode: string) => {
    const newCountry = COUNTRY_CALLING_CODES.find(
      (c) => c.code?.replace("+", "") === countryCode?.replace("+", ""),
    )?.label;
    if (newCountry) setFieldValue("country", newCountry);
  };

  const { mutate: mutateSubmit, isPending: isSubmitPending } = useMutation({
    mutationFn: realtorSignUp,
    onSuccess: (res) => {
      onCreated({
        email,
        avatar: null,
        id: "",
        referralId: "",
        token: res?.token,
        ...formik.values,
      });
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description:
          err?.response?.data?.message ??
          err?.response?.message ??
          "Something went wrong. Please try again.",
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "bottom-left",
      });
    },
  });

  /** Updates a field and clears its error, so the message goes away as soon as it's being fixed. */
  function setFieldValue(field: Field, value: string) {
    formik.setFieldValue(field, value);
  }

  const getFieldErrorMessage = (field: Field) =>
    formik.errors?.[field]?.toString();

  const isFieldInvalid = (field: Field) =>
    formik.dirty && formik.touched?.[field] && !!getFieldErrorMessage(field);

  const isDisabled = !formik.isValid;

  async function submit(e: FormEvent) {
    e.preventDefault();
    formik.handleSubmit();
  }

  return (
    <div className="step">
      <h1>Sell for {config.brandName}</h1>
      <p className="lede">
        {
          "Email confirmed. We don't have an account for it yet, so add your details to create your account."
        }
      </p>

      <form onSubmit={submit} noValidate>
        <div className="email-chip">
          <span>{email}</span>
          <button type="button" onClick={onChangeEmail}>
            Change
          </button>
        </div>

        {inviter && (
          <div className="invited-row">
            Invited by <b>{fullName(inviter)}</b>
            <LockIcon size={16} />
          </div>
        )}

        <div className="fields">
          <div className="field-row">
            <div
              className={`field ${isFieldInvalid("firstName") ? "is-invalid" : ""}`}
            >
              <label htmlFor="first-name">First name</label>
              <input
                id="first-name"
                name="firstName"
                className="input"
                autoComplete="given-name"
                placeholder="Chidinma"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={isFieldInvalid("firstName")}
                aria-describedby={
                  isFieldInvalid("firstName") ? "first-name-error" : undefined
                }
              />
              {Boolean(
                isFieldInvalid("firstName") &&
                getFieldErrorMessage("firstName"),
              ) && (
                <span className="field-error" id="first-name-error">
                  {getFieldErrorMessage("firstName")}
                </span>
              )}
            </div>
            <div
              className={`field ${isFieldInvalid("lastName") ? "is-invalid" : ""}`}
            >
              <label htmlFor="last-name">Last name</label>
              <input
                id="last-name"
                className="input"
                name="lastName"
                autoComplete="family-name"
                placeholder="Okafor"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={isFieldInvalid("lastName")}
                aria-describedby={
                  isFieldInvalid("lastName") ? "last-name-error" : undefined
                }
              />
              {Boolean(
                isFieldInvalid("lastName") && getFieldErrorMessage("lastName"),
              ) && (
                <span className="field-error" id="last-name-error">
                  {getFieldErrorMessage("lastName")}
                </span>
              )}
            </div>
          </div>

          <PhoneField
            name="phone"
            countryCode={countryCode}
            number={formik.values.phone}
            onBlur={formik.handleBlur}
            onCountryCodeChange={selectCountryCode}
            onNumberChange={(value) => {
              setFieldValue("phone", value);
            }}
            error={
              isFieldInvalid("phone")
                ? getFieldErrorMessage("phone")
                : undefined
            }
          />
        </div>

        <div className="actions">
          <Button
            type="submit"
            loading={isSubmitPending}
            disabled={isDisabled}
            loadingLabel="Creating account"
          >
            Create account
          </Button>
        </div>
      </form>
    </div>
  );
}
