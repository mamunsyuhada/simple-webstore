import { LoginServicePayload } from "../type";
import HTTP from "@/lib/API/HTTP";

class AuthService {

  public static async login(payload: LoginServicePayload){
    const url = '/user/login';
    return await HTTP.post(url, payload, false);
  }
}

export default AuthService;