import cartRepository from "./repository";
import productService from "../product/service";
import { AppError, ERRORS } from "../../helpers/error.helper";

class CartService {
  async clearCartById(id: string) {
    await cartRepository.clearCartById(id);
  }

  async updateAndInsert(userId: string, productId: string, quantity: number) {
    // Validate product and quantity
    const product = await productService.getProductById(productId);
    if (!product) {
      throw new AppError(
        ERRORS.productNotExists.message,
        ERRORS.productNotExists.statusCode,
      );
    }

    // Check stock availability
    if (product.stock < quantity) {
      throw new AppError(
        ERRORS.insufficientStock.message,
        ERRORS.insufficientStock.statusCode,
      );
    }

    const cartItems = await cartRepository.getCartItems(userId);
    if (cartItems.length >= 10) {
      throw new AppError(
        ERRORS.cartLimitExceeded.message,
        ERRORS.cartLimitExceeded.statusCode,
      );
    }

    // Check if product already exists in cart
    const existingItem = cartItems.find(
      (item) => item.product_id === productId,
    );
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (product.stock < newQuantity) {
        throw new AppError(
          ERRORS.stockNotEnough.message,
          ERRORS.stockNotEnough.statusCode,
        );
      }
      await cartRepository.updateCartItem(userId, productId, newQuantity);
    } else {
      await cartRepository.addItemToCart(userId, productId, quantity);
    }
  }

  async removeCartById(id: string) {
    await cartRepository.removeCartById(id);
  }

  async getCartItems(userId: string) {
    const cartItems = await cartRepository.getCartItems(userId);
    const detailedCartItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await productService.getProductById(item.product_id);
        return {
          ...item,
          product,
        };
      }),
    );
    return detailedCartItems;
  }

  async getCartItemsByCartId(cartId: string) {
    const cartItem = await cartRepository.getCartItemsByCartId(cartId);
    return cartItem;
  }
}

export default new CartService();
