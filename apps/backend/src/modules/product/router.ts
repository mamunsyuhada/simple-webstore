import { FastifyInstance } from "fastify";
import productApiHandler from "./api.handler";
import { checkValidUser } from "../../helpers/auth.helper";

const urlPattern = {
  type: "string",
  format: "uri",
};

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

  fastify.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            title: { type: "string" },
            price: { type: "number" },
            description: { type: "string" },
            category: { type: "string" },
            image: urlPattern,
          },
          required: ["title", "price", "description", "category", "image"],
        },
      },
      preHandler: [checkValidUser],
    },
    productApiHandler.create.bind(productApiHandler),
  );

  fastify.put(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            title: { type: "string" },
            price: { type: "number" },
            description: { type: "string" },
            category: { type: "string" },
            image: urlPattern,
          },
          required: [],
        },
      },
      preHandler: [checkValidUser],
    },
    productApiHandler.update.bind(productApiHandler),
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: { id: { type: "string" } },
          required: ["id"],
        },
        preHandler: [checkValidUser],
      },
    },
    productApiHandler.delete.bind(productApiHandler),
  );
}

export default productRouter;
