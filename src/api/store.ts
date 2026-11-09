import { BaseURL_TWO, getStoreName } from "@/constants/routes";
import { StoreInfoResponse } from "./types";
import axios from "./utils/axios";

export const getStoreInfo = async (): Promise<StoreInfoResponse> => {
  const storeName = getStoreName();
  const response = await axios.get<StoreInfoResponse>(
    `${BaseURL_TWO}/store/store_info/?store_name=${storeName}`,
  );
  return response.data;
};
