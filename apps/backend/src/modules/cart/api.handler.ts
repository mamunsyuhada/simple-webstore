import { FastifyReply, FastifyRequest } from "fastify";
import cartService from "./service";
import { handleServerError } from "../../helpers/error.helper";

class CartApiHandler {
  async addItem(
    req: FastifyRequest<{
      Body: { authUser: { id: string }; productId: string; quantity: number };
    }>,
    reply: FastifyReply,
  ) {
    try {
      const { id: userId } = req.body.authUser;
      const { productId, quantity } = req.body;
      await cartService.updateAndInsert(userId, productId, quantity);
      return reply.code(200).send({ message: "Item added to cart" });
    } catch (err) {
      return handleServerError(reply, err);
    }
  }

  async removeCartById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const { id } = req.params;
      await cartService.removeCartById(id);
      return reply.code(200).send({ message: "Item removed from cart" });
    } catch (err) {
      return handleServerError(reply, err);
    }
  }

  async getCart(
    req: FastifyRequest<{ Body: { authUser: { id: string } } }>,
    reply: FastifyReply,
  ) {
    try {
      const { id: userId } = req.body.authUser;
      const cartItems = await cartService.getCartItems(userId);
      return reply.code(200).send(cartItems);
    } catch (err) {
      return handleServerError(reply, err);
    }
  }
}

export default new CartApiHandler();
