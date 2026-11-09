import { useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { OtpInput } from "../ui/OtpInput";
import useTimer from "@/hooks/useTimer";

import { object as YupObject, string as YupString } from "yup";
import { useMutation } from "@tanstack/react-query";
import {
  generateGenericOTP,
  realtorLogin,
  validateGenericOTP,
  verifyRealtorToken,
} from "@/api/auth";
import { Center, Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useFormik } from "formik";
import { AuthUser, RealtorVerificationResponse } from "@/api/types";

interface Props {
  email: string;
  isSigningUp: boolean;
  onVerified(params: {
    kind: "signin" | "signup";
    user: (AuthUser & { token: string }) | null;
  }): void;
  onChangeEmail(): void;
}

const CODE_LENGTH = 6;

/** Step 2: confirm the 6 digit code sent to the email. */
export function CodeStep({
  email,
  isSigningUp,
  onVerified,
  onChangeEmail,
}: Props) {
  const toast = useToast();

  const [otpError, setOtpError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);

  const isLoggedIn = !isSigningUp;

  const { count: timer, reset: resetTimer } = useTimer(30);

  function changeCode(value: string) {
    formik.setFieldValue("otp", value);
    setOtpError(null);
  }

  const validationSchema = YupObject().shape({
    otp: YupString()
      .required("OTP is required")
      .min(6, "OTP can't be less than 6 digits")
      .max(6, "OTP can't exceed 6 digits"),
  });

  const { isPending: isResendingOTP, mutate: resendOTP } = useMutation({
    mutationFn: () => {
      if (isLoggedIn) {
        const payload = { email, otp_login: true };
        return realtorLogin(payload);
      } else {
        const payload = { email };
        return generateGenericOTP(payload);
      }
    },
    onError: () => {
      toast({
        title: "Could not resend OTP",
        description: "Please try again",
        status: "error",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
    },
    onSuccess: () => {
      changeCode("");
      resetTimer();
      setResent(false);
    },
  });

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: async (payload: { email: string; otp: string }) =>
      isLoggedIn
        ? verifyRealtorToken({ ...payload })
        : validateGenericOTP({ ...payload }),
    onSuccess: (res: AxiosResponse<RealtorVerificationResponse>) => {
      let kind: "signup" | "signin" = "signup";
      let authUser: (AuthUser & { token: string }) | null = null;
      const user = res.data?.user;
      const token = res.data?.user_tokens?.token;

      if (isLoggedIn && user && token) {
        kind = "signin";

        authUser = {
          email: user?.email,
          firstName: user?.first_name,
          lastName: user?.last_name,
          avatar: user?.avatar ?? null,
          phone: user?.phone,
          country: user?.country,
          referralId: user?.referral_id,
          id: user?.id?.toString(),
          token,
        };
      }

      onVerified({ kind, user: authUser });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errorType =
        isAxiosError(err) &&
        err?.response?.data?.message
          ?.toString()
          ?.toLowerCase()
          ?.includes("otp has expired")
          ? "Otp has expired"
          : isAxiosError(err) &&
              err?.response?.data?.message
                ?.toString()
                ?.toLowerCase()
                ?.includes("invalid otp")
            ? "OTP is wrong"
            : null;

      setOtpError(errorType);

      formik.setFieldValue("otp", "");

      if (!errorType) {
        toast({
          title: "Could not submit OTP",
          description: "Please try again",
          duration: 4000,
          isClosable: true,
          status: "error",
        });
      }
    },
    onSettled: () => {
      formik.setSubmitting(false);
    },
  });

  const formik = useFormik({
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    initialValues: {
      otp: "",
    },
    onSubmit: (values) => {
      mutate({ otp: values.otp, email });
    },
  });

  async function submit(e: FormEvent) {
    e.preventDefault();
    formik.handleSubmit();
  }

  async function resendCode() {
    if (isResendingOTP) return;
    resendOTP();
  }

  return (
    <div className="step">
      <h1>Check your email</h1>
      <p className="lede">
        Enter the 6 digit code we sent to <strong>{email}</strong> to confirm
        it's you.
      </p>

      <form onSubmit={submit} noValidate>
        <OtpInput
          value={formik.values.otp}
          onChange={changeCode}
          length={CODE_LENGTH}
          invalid={Boolean(otpError)}
          disabled={isLoading}
        />
        {otpError && (
          <p className="field-error" role="alert">
            {otpError}
          </p>
        )}

        <p className="resend">
          {resent && timer > 0 ? "New code sent. " : "Didn't get it? "}
          <Center display="inline-flex" gap="6px">
            <button
              type="button"
              className="link"
              onClick={resendCode}
              disabled={timer > 0}
            >
              {timer <= 0
                ? "Resend code"
                : `Resend in ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`}
            </button>
            {isResendingOTP && <Spinner size="sm" />}
          </Center>
        </p>

        <div className="actions">
          <Button
            type="submit"
            loading={isLoading}
            loadingLabel="Checking"
            disabled={!formik.isValid || isResendingOTP}
          >
            Continue
          </Button>
          <p className="note">
            <button type="button" className="link" onClick={onChangeEmail}>
              Use a different email
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
