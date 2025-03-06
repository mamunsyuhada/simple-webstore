import { FastifyReply, FastifyRequest } from "fastify";
import { handleServerError } from "../../helpers/error.helper";
import { STANDARD } from "../../constants/request";
import productService from "./service";

class ProductApiHandler {
  async list(
    req: FastifyRequest<{ Querystring: { page: number; limit: number } }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await productService.getPaginatedProducts(page, limit);

      return reply.code(STANDARD.OK.statusCode).send(result);
    } catch (err) {
      return handleServerError(reply, err);
    }
  }
}

export default new ProductApiHandler();
