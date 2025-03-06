import { FastifyReply, FastifyRequest } from "fastify";
import { handleServerError } from "../../helpers/error.helper";
import { STANDARD } from "../../constants/request";

class UserApiHandler {
  async login(_: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
    try {
      return reply.code(STANDARD.OK.statusCode).send({
        token: "token",
        user: "user",
      });
    } catch (err) {
      return handleServerError(reply, err);
    }
  }
}

export default new UserApiHandler();
