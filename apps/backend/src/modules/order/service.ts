import cartService from "../cart/service";
import { AppError, ERRORS } from "../../helpers/error.helper";
import productService from "../product/service";
import orderRepository from "./repository";

class OrderService {
  async getOrders(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const orders = await orderRepository.getOrders(limit, offset);
    const total = await orderRepository.getTotalOrdersCount();
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: orders,
    };
  }

  async getOrderDetail(id: string, userId: string) {
    const orderDetail = await orderRepository.getOrderDetail(id, userId);
    if (!orderDetail) {
      throw new AppError("Order not found", 404);
    }
    return orderDetail;
  }

  async checkout(userId: string, cartIds: string[], paymentMethod: string) {
    let allCartItems = [];
    let totalAmount = 0;

    // Validate cart items
    for (const cartId of cartIds) {
      const cartItems = await cartService.getCartItemsByCartId(cartId);
      if (cartItems.length === 0) {
        throw new AppError(`Cart with ID ${cartId} is empty`, 400);
      }
      allCartItems = allCartItems.concat(cartItems);
    }

    // Calculate total amount
    for (const item of allCartItems) {
      const product = await productService.getProductById(item.product_id);
      if (!product) {
        throw new AppError(
          ERRORS.productNotExists.message,
          ERRORS.productNotExists.statusCode,
        );
      }
      if (product.stock < item.quantity) {
        throw new AppError(
          ERRORS.insufficientStock.message,
          ERRORS.insufficientStock.statusCode,
        );
      }
      totalAmount += product.price * item.quantity;
    }

    const paymentStatus = "completed";

    // Create order
    const orderId = await orderRepository.insertOrder(
      userId,
      paymentMethod,
      paymentStatus,
      totalAmount,
      allCartItems,
    );

    // Update stock
    for (const item of allCartItems) {
      await productService.updateStock(item.product_id, -item.quantity);
    }

    // Clear carts
    for (const cartId of cartIds) {
      await cartService.clearCartById(cartId);
    }

    return { message: "Checkout successful", orderId };
  }

  async directPurchase(
    userId: string,
    productId: string,
    quantity: number,
    paymentMethod: string,
  ) {
    const product = await productService.getProductById(productId);
    if (!product) {
      throw new AppError(
        ERRORS.productNotExists.message,
        ERRORS.productNotExists.statusCode,
      );
    }
    if (product.stock < quantity) {
      throw new AppError(
        ERRORS.insufficientStock.message,
        ERRORS.insufficientStock.statusCode,
      );
    }

    const totalAmount = product.price * quantity;

    const paymentStatus = "completed";
    // Process payment
    // const paymentResult = await paymentService.processPayment(userId, totalAmount, paymentMethod);
    // if (!paymentResult.success) {
    //   throw new AppError("Payment failed", 500);
    // }

    // Create order and update stock
    const orderId = await orderRepository.insertOrder(
      userId,
      paymentMethod,
      paymentStatus,
      totalAmount,
      [{ product_id: productId, quantity }],
    );
    await productService.updateStock(productId, -quantity);

    return { message: "Purchase successful", orderId };
  }
}

export default new OrderService();
