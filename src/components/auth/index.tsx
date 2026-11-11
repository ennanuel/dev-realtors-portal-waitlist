"use client";

import { useState } from "react";

import { AuthAside } from "@/components/auth/AuthAside";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { CodeStep } from "@/components/auth/CodeStep";
import { DetailsStep } from "@/components/auth/DetailsStep";
import { EmailStep } from "@/components/auth/EmailStep";

import { object as YupObject, string as YupString } from "yup";
import { useFormik } from "formik";
import { AuthUser, Inviter } from "@/api/types";
import {
  REALTOR_SESSION_KEY,
  REALTOR_TOKEN_SESSION_KEY,
} from "@/constants/routes";
import { setSession } from "@/lib/sessionmanager";
import LoadingState from "../ui/LoadingState";
import { useQuery } from "@tanstack/react-query";
import { fetchRealtorByReferralId } from "@/api/auth";

type Step = "email" | "code" | "details";

type FormValues = {
  email: string;
  step: Step;
  isUserSigningUp: boolean;
};

type FormValuesWithoutStep = Omit<FormValues, "step">;

export function AuthPage({ inviteCode }: { inviteCode: string | null }) {
  const [isRerouting, setIsRerouting] = useState(false);

  const validationSchema = YupObject().shape({
    email: YupString()
      .required("Email address is required")
      .email("Email address is invalid"),
  });

  const formik = useFormik<FormValues>({
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    initialValues: {
      email: "",
      step: "email",
      isUserSigningUp: false,
    },
    onSubmit: (values) => {},
  });

  const setFieldValue = (
    field: keyof FormValuesWithoutStep,
    value: boolean | null,
  ) => {
    formik.setFieldValue(field, value);
  };
  const setStep = (step: Step) => {
    formik.setFieldValue("step", step);
  };
  const getFieldErrorMessage = (field: keyof FormValuesWithoutStep) =>
    formik.errors[field];
  const isFieldInvalid = (field: keyof FormValuesWithoutStep) =>
    formik.touched[field] && !!getFieldErrorMessage(field);

  function handleVerified(result: {
    kind: "signin" | "signup";
    user: (AuthUser & { token: string }) | null;
  }) {
    if (result.kind === "signin" && result.user) {
      handleUser(result.user);
    } else setStep("details");
  }

  function handleUser(
    user: AuthUser & { token: string },
    options?: { isNewUser?: boolean },
  ) {
    const { isNewUser } = options ?? {};
    const { token, ...userDetails } = user;

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    setSession(token, REALTOR_TOKEN_SESSION_KEY, expires);
    setSession(userDetails, REALTOR_SESSION_KEY, expires);

    location.assign(`/home?${isNewUser ? "is_new_user=true" : ""}`);
    setIsRerouting(true);
    // alert("done");
  }

  const backToEmail = () => setStep("email");

  const {
    isLoading: isCheckingInviteStatus,
    data: inviter = null,
    isError: isInviteInvalid,
  } = useQuery({
    queryKey: [inviteCode, "inviter_details"],
    queryFn: async () => {
      const result = await fetchRealtorByReferralId(inviteCode!);

      if (result?.data?.id === null || result?.data?.id === undefined)
        return null;

      const inviterDetails: Inviter = {
        firstName: result?.data?.first_name,
        lastName: result?.data?.last_name,
        inviteCode: inviteCode ?? "",
      };

      return inviterDetails;
    },
    enabled: !!inviteCode,
  });

  if (isRerouting || (isCheckingInviteStatus && !!inviteCode))
    return <LoadingState />;

  return (
    <AuthLayout
      aside={isCheckingInviteStatus ? null : <AuthAside inviter={inviter} />}
    >
      {Boolean(isInviteInvalid && formik?.values?.step === "email") && (
        <p className="notice">
          This invite link isn't valid any more. You can still sign up below.
        </p>
      )}

      {formik.values?.step === "email" && (
        <EmailStep
          inviter={inviter}
          email={formik.values.email}
          emailErrorMessage={getFieldErrorMessage("email") ?? null}
          emailIsInvalid={!!isFieldInvalid("email")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onCodeSent={(isSigningIn) => {
            setFieldValue("isUserSigningUp", !isSigningIn);
            if (!isSigningIn) {
            }
            setStep("code");
          }}
        />
      )}

      {formik.values?.step === "code" && (
        <CodeStep
          email={formik.values?.email}
          isSigningUp={formik.values?.isUserSigningUp}
          onVerified={handleVerified}
          onChangeEmail={backToEmail}
        />
      )}

      {formik.values?.step === "details" && (
        <DetailsStep
          email={formik.values?.email}
          inviter={inviter}
          referralCode={inviteCode ?? ""}
          onCreated={handleUser}
          onChangeEmail={backToEmail}
        />
      )}
    </AuthLayout>
  );
}
