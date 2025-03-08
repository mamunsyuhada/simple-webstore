import Cookies from "@/services/cookies";
import AxiosConfig from "./config";
import { RequestBody, Response, requestParams } from "./type";

class HTTP {
  public static async get<T>(
    url: string,
    query?: requestParams
  ): Promise<Response<T>> {
    const token =
      typeof window !== "undefined" ? Cookies.get("access_token") : undefined;

    try {
      const { data, status, statusText } = await AxiosConfig({
        token,
      }).get<Response<T>>(url, { params: query });

      return {
        result: { ...data },
        error: null,
      };
    } catch (error: any) {
      return { result: null, error };
    }
  }

  public static async post<T>(
    url: string,
    body: RequestBody,
    isAuth: boolean = true,
    asFormData?: boolean,
    keyUnite?: keyof T
  ): Promise<Response<T>> {
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
              value.forEach((item: any) => formData.append(key, item));
            } else {
              formData.append(key, value);
            }
          });
          actualBody = formData;
        }
      }

      const { data, status, statusText } = await AxiosConfig({
        ...(isAuth ? { token } : {}),
        ...(asFormData ? { isFormData: true } : {}),
      }).post<Response<T>>(url, actualBody);

      return {
        result: { ...data },
        error: null,
      };
    } catch (error: any) {
      return { result: null, error };
    }
  }

  public static async put<T>(
    url: string,
    body?: RequestBody
  ): Promise<Response<T>> {
    const token =
      typeof window !== "undefined" ? Cookies.get("token") : undefined;

    try {
      const { data, status, statusText } = await AxiosConfig({
        token,
      }).put<Response<T>>(url, body);

      return {
        result: { ...data },
        error: null,
      };
    } catch (error: any) {
      return { result: null, error };
    }
  }

  public static async patch<T>(
    url: string,
    body?: RequestBody
  ): Promise<Response<T>> {
    const token =
      typeof window !== "undefined" ? Cookies.get("token") : undefined;

    const { data, status, statusText } = await AxiosConfig({}).patch<
      Response<T>
    >(url, body);
    return {
      ...data,
    };
  }

  public static async delete<T>(url: string): Promise<Response<T>> {
    const token =
      typeof window !== "undefined" ? Cookies.get("token") : undefined;

    const { data, status, statusText } = await AxiosConfig({}).delete<
      Response<T>
    >(url);
    return {
      ...data,
    };
  }
}

export default HTTP;
