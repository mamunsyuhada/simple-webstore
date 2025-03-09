import Cookies from "@/services/cookies";
import AxiosConfig from "./config";
import { RequestBody, Response, ResponseFailed, requestParams } from "./type";

class HTTP {
  public static async get<T>(
    url: string,
    query?: requestParams
  ): Promise<Response<T, unknown>> {
    const token =
      typeof window !== "undefined" ? Cookies.get("access_token") : undefined;

    try {
      const { data } = await AxiosConfig({
        token,
      }).get<Response<T, unknown>>(url, { params: query });

      return {
        result: { ...data },
        error: null,
      };
    } catch (error: unknown) {
      return { result: null, error: error as ResponseFailed };
    }
  }

  public static async post<T>(
    url: string,
    body: RequestBody,
    isAuth: boolean = true,
    asFormData?: boolean,
    keyUnite?: keyof T
  ): Promise<Response<T, unknown>> {
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
              value.forEach((item: string | Blob) => formData.append(key, item));
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
      }).post<Response<T, unknown>>(url, actualBody);

      return {
        result: { ...data },
        error: null,
      };
    } catch (error: unknown) {
      return { result: null, error: error as ResponseFailed };
    }
  }

  public static async put<T>(
    url: string,
    body?: RequestBody
  ): Promise<Response<T, unknown>> {
    const token =
      typeof window !== "undefined" ? Cookies.get("token") : undefined;

    try {
      const { data } = await AxiosConfig({
        token,
      }).put<Response<T, unknown>>(url, body);

      return {
        result: { ...data },
        error: null,
      };
    } catch (error: unknown) {
      return { result: null, error: error as ResponseFailed };
    }
  }

  public static async patch<T>(
    url: string,
    body?: RequestBody
  ): Promise<Response<T, unknown>> {

    const { data } = await AxiosConfig({}).patch<
      Response<T, unknown>
    >(url, body);
    return {
      ...data,
    };
  }

  public static async delete<T>(url: string): Promise<Response<T, unknown>> {

    const { data } = await AxiosConfig({}).delete<
      Response<T, unknown>
    >(url);
    return {
      ...data,
    };
  }
}

export default HTTP;
