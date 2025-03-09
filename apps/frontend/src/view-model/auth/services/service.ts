/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse, LoginPayload } from "../type";
import HTTP from "@/lib/API/HTTP";

class AuthService {
  public static async login(payload: LoginPayload): Promise< ErrorResponse | any>{
    const url = '/user/login';
    const res = await HTTP.post(url, payload, false);
    return res;
  }
}

export default AuthService;