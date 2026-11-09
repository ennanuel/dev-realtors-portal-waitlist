/**
 * Shapes the frontend expects from the Realtors API.
 * Dates are ISO 8601 strings.
 */

export type RealtorStatus = "active" | "suspended";

export interface Realtor {
  id: string;
  /** Human readable reference shown in the account menu, e.g. "RIN-00418". */
  referenceId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Code used in this realtor's invite link: /join/{inviteCode} */
  inviteCode: string;
  status: RealtorStatus;
  joinedAt: string;
}

/** Public info about the owner of an invite link. */
export interface Inviter {
  firstName: string;
  lastName: string;
  inviteCode: string;
}

/** Someone in a realtor's downline. `referrals` holds the people they brought in. */
export interface DownlineMember {
  id: string;
  firstName: string;
  lastName: string;
  status: RealtorStatus;
  joinedAt: string;
  referrals: DownlineMember[];
}

export interface Session {
  token: string;
  realtor: Realtor;
  /**
   * True when an existing realtor signed in through someone else's invite link.
   * The invite is not applied because each realtor can only join one network.
   */
  inviteIgnored?: boolean;
}

export interface CreateAccountInput {
  /** Proves the email was confirmed. Returned by verifyOtp for new emails. */
  signupToken: string;
  firstName: string;
  lastName: string;
  /** Full international number, e.g. "+234 803 112 4410". */
  phone: string;
  inviteCode?: string;
}

export type AuthUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  avatar: string | null;
  referralId: string;
  id: string;
};

export type RealtorVerificationResponse = {
  valid: boolean;
  message: string;
  user: {
    id: number;
    phone: string;
    referral_id: string;
    approved_by: {
      customer_info?: string;
      id: number;
      username?: string;
      first_name: string;
      last_name: string;
      middle_name?: string;
      phone?: string;
      avatar?: string;
      email: string;
      last_activity: string;
      sign_up_time: string;
      gender?: string;
      country: string;
      initial_status: string;
      status: boolean;
    };
    status: boolean;
    country: string;
    group: {
      id?: number;
      group_name?: string;
      role: string;
    };
    active: boolean;
    blacklisted: boolean;
    refunded_balance: string;
    initial_status: string;
    is_tier3: boolean;
    default_timezone?: string;
    gender: string;
    created_at: string;
    avatar?: string;
    highest_education?: string;
    address?: string;
    employment_status?: string;
    monthly_income?: string;
    yearly_income?: string;
    occupation?: string;
    marital_status?: string;
    company_name?: string;
    company_address?: string;
    email: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    year_of_birth?: string;
    bvn?: string;
    date_of_birth: string;
    biometric_authentication: false;
    alternate_phone?: string;
    alternate_country_code?: string;
    is_blocked: boolean;
    push_notification_allowed: boolean;
    mfa_secret?: string;
    is_mfa: boolean;
    approved_at: string;
    blacklisted_at?: string;
    rejection_reason?: string;
    agent_id: string;
    sign_up_time: string;
    user: number;
    business: number;
    blacklisted_by?: any;
  };
  store: {
    id: number;
    header_image?: string;
    owner: {
      customer_info?: string;
      id: number;
      username?: string;
      first_name: string;
      last_name: string;
      middle_name?: string;
      phone?: string;
      avatar?: string;
      email: string;
      last_activity: string;
      sign_up_time: string;
      gender?: string;
      country: string;
      initial_status: string;
      status: number;
    };
    company_image: string;
    store_name: string;
    theme_name: string;
    theme_color: string;
    theme_mode: string;
    project_created: boolean;
    deployment_successful: boolean;
    deployment_status: string;
    about?: string;
    active: boolean;
    custom: boolean;
    auto_deploy: boolean;
    preview_link: null;
    repoId: string;
    realtor_repoId: string;
    projectId: string;
    realtor_projectId: string;
    has_employee_deployment: boolean;
    agent_features: boolean;
    auto_pay_features: boolean;
    fractional_features: boolean;
    co_ownership_features: boolean;
    wallet_features: boolean;
    withdrawal_enabled: boolean;
    service_down: boolean;
    sub_theme: string;
    enable_kyc: boolean;
    business: number;
  };
  user_tokens: {
    refresh: string;
    token: string;
  };
};
