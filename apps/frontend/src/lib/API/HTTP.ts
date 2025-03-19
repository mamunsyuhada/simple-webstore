/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "@/services/cookies";
import AxiosConfig from "./config";
import { RequestBody, ResponseFailed, requestParams } from "./type";

class HTTP {
  public static async get(url: string, query?: requestParams): Promise<any> {
    const token =
      typeof window !== "undefined" ? Cookies.get("access_token") : undefined;

    try {
      const { data } = await AxiosConfig({
        token,
      }).get(url, { params: query });

      return {
        result: { ...data },
        error: null,
      };
    } catch (error: any) {
      return { result: null, error: error as ResponseFailed };
    }
  }

  public static async post<T>(
    url: string,
    body: RequestBody,
    isAuth: boolean = true,
    asFormData?: boolean,
    keyUnite?: keyof T,
  ): Promise<any> {
    const token =
      typeof window !== "undefined" ? Cookies.get("access_token") : undefined;

    try {
      let actualBody: RequestBody | FormData = body ? { ...body } : {};

      if (asFormData) {
        if (body instanceof FormData) {
          actualBody = body;
        } else {
          const formData = new FormData();
          Object.entries(body).forEach(([key, value]) => {
            if (keyUnite === key && Array.isArray(value)) {
              value.forEach((item: string | Blob) =>
                formData.append(key, item),
              );
            } else {
              formData.append(key, value);
            }
          });
          actualBody = formData;
        }
      }

      const { data } = await AxiosConfig({
        ...(isAuth ? { token } : {}),
        ...(asFormData ? { isFormData: true } : {}),
      }).post(url, actualBody);

      return {
        result: { ...data },
        error: null,
      };
    } catch (error: any) {
      return { result: null, error: error as ResponseFailed };
    }
  }

  public static async put(url: string, body?: RequestBody): Promise<any> {
    const token =
      typeof window !== "undefined" ? Cookies.get("access_token") : undefined;

    try {
      const { data } = await AxiosConfig({
        token,
      }).put<any>(url, body);

      return {
        result: { ...data },
        error: null,
      };
    } catch (error: any) {
      return { result: null, error: error as ResponseFailed };
    }
  }

  public static async patch(url: string, body?: RequestBody): Promise<any> {
    const { data } = await AxiosConfig({}).patch(url, body);
    return {
      ...data,
    };
  }

  public static async delete(url: string): Promise<any> {
    const token =
      typeof window !== "undefined" ? Cookies.get("access_token") : undefined;
    const { data } = await AxiosConfig({
      token,
    }).delete(url);
    return {
      ...data,
    };
  }
}

export default HTTP;
