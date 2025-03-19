import axios, { AxiosInstance } from "axios";
import { AxiosConfigType } from "../type";

const AxiosConfig = ({ token }: AxiosConfigType): AxiosInstance => {
  return axios.create({
    /** @API_CONFIG */
    baseURL: process.env.NEXT_PUBLIC_CLIENT_API,
    headers: {
      ...(token ? { Authorization: "Bearer " + token } : {}),
      Accept: "*/*",
    },
  });
};

export default AxiosConfig;
