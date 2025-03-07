import { FastifyReply, FastifyRequest } from "fastify";
import { handleServerError } from "../../helpers/error.helper";
import { STANDARD } from "../../constants/request";
import stockAdjustmentService from "./service";

class StockAdjustmentApiHandler {
  async create(
    req: FastifyRequest<{
      Body: {
        authUser: { id: string };
        productId: string;
        quantity: number;
        reason: string;
      };
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { id: userId } = req.body.authUser;
      const { productId, quantity, reason } = req.body;

      await stockAdjustmentService.adjustStock(
        userId,
        productId,
        quantity,
        reason,
      );

      return reply
        .code(STANDARD.OK.statusCode)
        .send({ message: "Stock adjusted successfully" });
    } catch (err) {
      return handleServerError(reply, err);
    }
  }
}

export default new StockAdjustmentApiHandler();
