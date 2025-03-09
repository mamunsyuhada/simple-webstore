export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}