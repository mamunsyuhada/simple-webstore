/* eslint-disable @typescript-eslint/no-explicit-any */
export type AxiosConfigType = {
  token?: string | null;
  isFormData?: boolean;
};

export type ResponseSuccess<T> = {
  status: number;
  status_code: number;
  message: string;
  data: T;
  count: number;
  next: null | string;
  prev: null | string;
};

export type ResponseFailed = {
  response: unknown;
  status_code: number;
  message: string;
  exc_type: string;
  exception: string;
  exc: string;
  _server_messages: string;
};

export type RequestBody =
  | FormData
  | {
      [key: string];
    };

export type requestParams = {
  [key: string]: number | string | number[] | string[];
};

export type ResponseError = {
  status_code: number;
  message: string;
  exc_type: string;
  exception: string;
  exc: string;
  _server_messages: string;
};
