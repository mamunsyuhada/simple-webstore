import stockAdjustmentRepository from "./repository";
import productService from "../product/service";
import { AppError, ERRORS } from "../../helpers/error.helper";

class StockAdjustmentService {
  async adjustStock(
    userId: string,
    productId: string,
    quantity: number,
    reason: string = null,
  ): Promise<void> {
    const product = await productService.getProductById(productId);
    if (!product) {
      throw new AppError(
        ERRORS.productNotExists.message,
        ERRORS.productNotExists.statusCode,
      );
    }

    if (product.stock + quantity < 0) {
      throw new AppError(
        ERRORS.stockNotEnough.message,
        ERRORS.stockNotEnough.statusCode,
      );
    }

    await stockAdjustmentRepository.createStockAdjustmentUpdateProduct(
      userId,
      productId,
      quantity,
      reason,
    );
  }
}

export default new StockAdjustmentService();
