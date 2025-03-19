import { FastifyInstance } from "fastify";
import { checkValidUser } from "../../helpers/auth.helper";
import orderApiHandler from "./api.handler";

const paymentMethodEnum = ["cash", "cashless"];

async function orderRouter(fastify: FastifyInstance) {
  fastify.post(
    "/checkout",
    {
      preHandler: [checkValidUser],
      schema: {
        body: {
          type: "object",
          properties: {
            cartIds: {
              type: "array",
              items: { type: "string" },
            },
            paymentMethod: {
              type: "string",
              enum: paymentMethodEnum,
            },
          },
          required: ["cartIds", "paymentMethod"],
        },
      },
    },
    orderApiHandler.checkout.bind(orderApiHandler),
  );

  fastify.post(
    "/direct-purchase",
    {
      preHandler: [checkValidUser],
      schema: {
        body: {
          type: "object",
          properties: {
            productId: { type: "string" },
            quantity: { type: "integer" },
            paymentMethod: {
              type: "string",
              enum: paymentMethodEnum,
            },
          },
          required: ["productId", "quantity", "paymentMethod"],
        },
      },
    },
    orderApiHandler.directPurchase.bind(orderApiHandler),
  );

  fastify.get(
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
    orderApiHandler.getDetail.bind(orderApiHandler),
  );

  fastify.get(
    "/",
    {
      preHandler: [checkValidUser],
      schema: {
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", minimum: 1, default: 1 },
            limit: { type: "integer", minimum: 1, default: 10 },
          },
          required: ["page", "limit"],
        },
      },
    },
    orderApiHandler.getOrders.bind(orderApiHandler),
  );
}

export default orderRouter;
