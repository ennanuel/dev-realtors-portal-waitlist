import { BaseURL_ONE, BaseURL_TWO, getStoreName } from "@/constants/routes";
import axios from "./utils/axios";
import { RealtorVerificationResponse } from "./types";

type LoginResponse = {
  action: "signup" | "not_customer" | "login" | "verify_otp" | "pending";
  link?: string;
  data?: Object;
};

export const realtorLogin = async (payload: {
  email: string;
  otp_login?: boolean;
}) => {
  const storeName = getStoreName();
  const body = { ...payload, store_name: storeName };
  return await axios.post<LoginResponse>(
    `${BaseURL_TWO}/store/agent-webstore`,
    body,
  );
};

type RealtorSignUpResponse = {
  message: string;
  status: boolean;
  refresh_token: string;
  token: string;
};

type RealtorSignUpParams = {
  first_name: string;
  last_name: string;
  country: string;
  phone: string;
  email: string;
  referral_id: string;
};

export const realtorSignUp = async (
  formData: RealtorSignUpParams,
): Promise<RealtorSignUpResponse> => {
  const storeName = getStoreName();

  let payload = { ...formData, auto_approval: true, store_name: storeName };
  const result = await axios.post(`${BaseURL_ONE}/user/agent`, payload);
  return result.data;
};

export const generateGenericOTP = (payload: { email: string }) => {
  const storeName = getStoreName();
  const body = {
    ...payload,
    store_name: storeName,
  };
  return axios.post(`${BaseURL_TWO}/store/generic-otp/create/`, body);
};

export const validateGenericOTP = (payload: { email: string; otp: string }) => {
  const storeName = getStoreName();
  const body = { ...payload, store_name: storeName };
  return axios.post(`${BaseURL_TWO}/store/generic-otp/verify/`, body);
};

export const verifyRealtorToken = async (payload: {
  token?: string;
  email?: string;
  otp?: string;
  store_name?: string;
}) => {
  const storeName = getStoreName();
  const body = { ...payload, store_name: storeName };
  return await axios.post<RealtorVerificationResponse>(
    `${BaseURL_TWO}/store/verify-agent-token`,
    body,
  );
};

export const fetchRealtorSettingsInfo = async () => {
  const storeName = getStoreName();

  const response = await axios.get(
    `${BaseURL_TWO}/agents/settings/?store_name=${storeName}`,
  );
  return response.data;
};

export type ReferralRealtor = {
  id: number;
  agent_id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
  phone: string;
  country_code: string;
};

type ReferralInfoResponse = {
  message: "Agent retrieved successfully";
  status: true;
  data: ReferralRealtor;
};

export const fetchRealtorByReferralId = async (
  refId: string,
): Promise<ReferralInfoResponse> => {
  const response = await axios.get(
    `${BaseURL_ONE}/user/agent/referral/${refId}`,
  );
  return response.data;
};
