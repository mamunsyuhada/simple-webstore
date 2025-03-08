import { FastifyReply, FastifyRequest } from "fastify";
import orderService from "./service";
import { handleServerError } from "../../helpers/error.helper";

class OrderApiHandler {
  async getOrders(
    req: FastifyRequest<{ Querystring: { page: number; limit: number } }>,
    reply: FastifyReply,
  ) {
    try {
      const { page, limit } = req.query;
      const orders = await orderService.getOrders(page, limit);
      return reply.code(200).send(orders);
    } catch (err) {
      return handleServerError(reply, err);
    }
  }

  async getDetail(
    req: FastifyRequest<{
      Body: {
        authUser: { id: string };
      };
      Params: { id: string };
    }>,
    reply: FastifyReply,
  ) {
    try {
      const { id: userId } = req.body.authUser;
      const { id } = req.params;
      const orderDetail = await orderService.getOrderDetail(id, userId);
      return reply.code(200).send(orderDetail);
    } catch (err) {
      return handleServerError(reply, err);
    }
  }

  async checkout(
    req: FastifyRequest<{
      Body: {
        authUser: { id: string };
        cartIds: string[];
        paymentMethod: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    try {
      const { id: userId } = req.body.authUser;
      const { cartIds, paymentMethod } = req.body;
      const result = await orderService.checkout(
        userId,
        cartIds,
        paymentMethod,
      );
      return reply.code(200).send(result);
    } catch (err) {
      return handleServerError(reply, err);
    }
  }

  async directPurchase(
    req: FastifyRequest<{
      Body: {
        authUser: { id: string };
        productId: string;
        quantity: number;
        paymentMethod: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    try {
      const { id: userId } = req.body.authUser;
      const { productId, quantity, paymentMethod } = req.body;
      const result = await orderService.directPurchase(
        userId,
        productId,
        quantity,
        paymentMethod,
      );
      return reply.code(200).send(result);
    } catch (err) {
      return handleServerError(reply, err);
    }
  }
}

export default new OrderApiHandler();
