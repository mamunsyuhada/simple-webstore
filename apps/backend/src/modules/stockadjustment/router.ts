import { FastifyInstance } from "fastify";

import stockAdjustmentApiHandler from "./api.handler";
import { checkValidUser } from "../../helpers/auth.helper";

async function stockAdjustmentRouter(fastify: FastifyInstance) {
  fastify.post(
    "/create",
    {
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
      preHandler: [checkValidUser],
    },
    stockAdjustmentApiHandler.create.bind(stockAdjustmentApiHandler),
  );
}

export default stockAdjustmentRouter;
