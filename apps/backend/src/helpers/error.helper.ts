import { FastifyReply } from "fastify";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const ERRORS = {
  invalidToken: new AppError("Token is invalid.", 401),
  userExists: new AppError("User already exists", 409),
  userNotExists: new AppError("User not exists", 404),
  userCredError: new AppError("Invalid credential", 401),
  tokenError: new AppError("Invalid Token", 401),
  invalidRequest: new AppError("Invalid request", 400),
  internalServerError: new AppError("Internal Server Error", 500),
  unauthorizedAccess: new AppError("Unauthorized access", 401),

  productNotExists: new AppError("Product not exists", 404),
  stockNotEnough: new AppError("Stock not enough", 400),
  insufficientStock: new AppError("Insufficient stock", 400),
  cartLimitExceeded: new AppError("Cart limit exceeded", 400),
};

export function handleServerError(reply: FastifyReply, error: any) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  return reply
    .status(ERRORS.internalServerError.statusCode)
    .send({ message: ERRORS.internalServerError.message });
}
