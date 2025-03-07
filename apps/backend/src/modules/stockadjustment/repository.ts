import knex from "../../helpers/pg.conn";
import { AppError, ERRORS } from "../../helpers/error.helper";

class StockAdjustmentRepository {
  async createStockAdjustmentUpdateProduct(
    adjustor: string,
    productId: string,
    adjustment: number,
    reason?: string,
  ) {
    const trx = await knex.transaction();

    try {
      const query = `
        WITH new_adjustment AS (
          INSERT INTO stock_adjustments (adjustor, product_id, adjustment, reason)
          VALUES (?, ?, ?, ?)
          RETURNING *
        )
        UPDATE products
        SET stock = stock + ?
        WHERE id = ?
        RETURNING *;
      `;

      await trx.raw(query, [
        adjustor,
        productId,
        adjustment,
        reason,
        adjustment,
        productId,
      ]);

      await trx.commit();
    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw new AppError(
        "Failed to create stock adjustment",
        ERRORS.internalServerError.statusCode,
      );
    }
  }
}

export default new StockAdjustmentRepository();
