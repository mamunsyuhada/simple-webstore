import { FastifyReply, FastifyRequest } from 'fastify';
import { handleServerError } from '../../helpers/error.helper';
import { STANDARD } from '../../constants/request';

export const login = async (_: FastifyRequest<{Body: any}>, reply: FastifyReply) => {
  try {
    return reply.code(STANDARD.OK.statusCode).send({
      token: "token",
      user: "user",
    });
  } catch (err) {
    return handleServerError(reply, err);
  }
};
