import { BaseURL_TWO, getStoreName } from "@/constants/routes";
import axios from "./utils/axios";

export type AgentDownline = {
  id: number | string;
  agent_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  avatar: string;
  status: string;
  referred_count: number;
  joined_at: string;
  downline: AgentDownline[];
};

type AgentDownlineResponse = {
  status: boolean;
  referral_id: string;
  total_downline: number;
  downline: AgentDownline[];
};

export const fetchAgentDownline = () =>
  new Promise<AgentDownlineResponse>(async (resolve, reject) => {
    try {
      const storeName = getStoreName();
      const response = await axios.get(
        `${BaseURL_TWO}/agents/downline/?store_name=${storeName}`,
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
