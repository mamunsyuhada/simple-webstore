import { utils } from "../utils";
import { FastifyRequest, FastifyReply } from "fastify";
import { ERRORS } from "./error.helper";
import userService from "../modules/user/service";

export const checkValidRequest = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const token = utils.getTokenFromHeader(request.headers.authorization);
    if (!token) {
      return reply
        .code(ERRORS.unauthorizedAccess.statusCode)
        .send({ message: ERRORS.unauthorizedAccess.message });
    }

    const decoded = utils.verifyToken(token);
    if (!decoded) {
      return reply
        .code(ERRORS.unauthorizedAccess.statusCode)
        .send({ message: ERRORS.unauthorizedAccess.message });
    }

    request["authUser"] = decoded;
  } catch (error) {
    return reply
      .code(ERRORS.internalServerError.statusCode)
      .send({ message: ERRORS.internalServerError.message });
  }
};

export const checkValidUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const token = utils.getTokenFromHeader(request.headers.authorization);
    if (!token) {
      return reply
        .code(ERRORS.unauthorizedAccess.statusCode)
        .send({ message: ERRORS.unauthorizedAccess.message });
    }

    const decoded = utils.verifyToken(token);
    if (!decoded || !decoded.id) {
      return reply
        .code(ERRORS.unauthorizedAccess.statusCode)
        .send({ message: ERRORS.unauthorizedAccess.message });
    }

    const userData = await userService.getUserById(decoded.id);
    if (!userData) {
      return reply
        .code(ERRORS.unauthorizedAccess.statusCode)
        .send({ message: ERRORS.unauthorizedAccess.message });
    }

    request["authUser"] = userData;
  } catch (error) {
    return reply
      .code(ERRORS.internalServerError.statusCode)
      .send({ message: ERRORS.internalServerError.message });
  }
};
