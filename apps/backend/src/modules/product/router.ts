import { FastifyInstance } from "fastify";
import productApiHandler from "./api.handler";

async function productRouter(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", minimum: 1, default: 1 },
            limit: { type: "integer", minimum: 1, default: 10 },
          },
          required: [],
        },
      },
    },
    productApiHandler.list.bind(productApiHandler),
  );
}

export default productRouter;
