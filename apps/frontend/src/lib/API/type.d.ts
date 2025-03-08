export type AxiosConfigType = {
  token?: string | null;
  isFormData?: boolean;
};

export type ResponseSuccess<T, P = any> = {
  status: number;
  status_code: number;
  message: string;
  data: T;
  count: number;
  next: null | string;
  prev: null | string;
};

export type ResponseFailed = {
  status_code: number;
  message: string;
  exc_type: string;
  exception: string;
  exc: string;
  _server_messages: string;
};

export type Response<T, P = any> = {
  result: ResponseSuccess | null;
  error: any | null;
};

export type RequestBody =
  | FormData
  | {
      [key: string]: any;
    };

export type requestParams = {
  [key: string]: number | string | number[] | string[];
};

export type ResponseError = {};
