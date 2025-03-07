import { FastifyReply, FastifyRequest } from "fastify";
import { handleServerError } from "../../helpers/error.helper";
import { STANDARD } from "../../constants/request";
import userService from "./service";

class UserApiHandler {
  async login(
    req: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);

      return reply.code(STANDARD.OK.statusCode).send(result);
    } catch (err) {
      return handleServerError(reply, err);
    }
  }
}

export default new UserApiHandler();
