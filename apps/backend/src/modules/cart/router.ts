import { FastifyInstance } from "fastify";
import cartApiHandler from "./api.handler";
import { checkValidUser } from "../../helpers/auth.helper";

async function cartRouter(fastify: FastifyInstance) {
  fastify.post(
    "/",
    {
      preHandler: [checkValidUser],
      schema: {
        body: {
          type: "object",
          properties: {
            productId: { type: "string" },
            quantity: { type: "integer" },
          },
          required: ["productId", "quantity"],
        },
      },
    },
    cartApiHandler.addItem.bind(cartApiHandler),
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [checkValidUser],
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
      },
    },
    cartApiHandler.removeCartById.bind(cartApiHandler),
  );

  fastify.get(
    "/",
    {
      preHandler: [checkValidUser],
    },
    cartApiHandler.getCart.bind(cartApiHandler),
  );
}

export default cartRouter;
