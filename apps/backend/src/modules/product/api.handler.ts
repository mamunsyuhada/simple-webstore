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

  async create(
    req: FastifyRequest<{
      Body: {
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
      };
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const result = await productService.createProduct(
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.category,
        req.body.image,
      );

      return reply.code(STANDARD.CREATED.statusCode).send(result);
    } catch (err) {
      return handleServerError(reply, err);
    }
  }

  async update(
    req: FastifyRequest<{
      Params: { id: string };
      Body: {
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
      };
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const result = await productService.updateProduct(
        req.params.id,
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.category,
        req.body.image,
      );

      return reply.code(STANDARD.OK.statusCode).send(result);
    } catch (err) {
      return handleServerError(reply, err);
    }
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      await productService.deleteProduct(req.params.id);

      return reply.code(STANDARD.NO_CONTENT.statusCode).send();
    } catch (err) {
      return handleServerError(reply, err);
    }
  }
}

export default new ProductApiHandler();
