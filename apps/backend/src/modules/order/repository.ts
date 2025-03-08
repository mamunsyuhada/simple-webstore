import knex from "../../helpers/pg.conn";

class OrderRepository {
  async getOrders(limit: number, offset: number) {
    const query = `
      SELECT
        orders.id,
        orders.user_id,
        orders.payment_method,
        orders.amount,
        orders.payment_status,
        orders.created_at,
        orders.updated_at,
        json_agg(
          json_build_object(
            'product_id', order_items.product_id,
            'quantity', order_items.quantity,
            'product_title', products.title,
            'product_price', products.price
          )
        ) AS items
      FROM orders
      JOIN order_items ON orders.id = order_items.order_id
      JOIN products ON order_items.product_id = products.id
      GROUP BY orders.id
      LIMIT ? OFFSET ?
    `;
    const result = await knex.raw(query, [limit, offset]);
    return result.rows;
  }

  async getTotalOrdersCount() {
    const query = `
      SELECT COUNT(*) AS total FROM orders
    `;
    const result = await knex.raw(query);
    return result.rows[0].total;
  }

  async getOrderDetail(orderId: string, userId: string) {
    try {
      const query = `
      SELECT
        orders.id,
        orders.user_id,
        orders.payment_method,
        orders.amount,
        orders.payment_status,
        orders.created_at,
        orders.updated_at,
        json_agg(
        json_build_object(
          'product_id', order_items.product_id,
          'quantity', order_items.quantity,
          'product_title', products.title,
          'product_price', products.price
        )
        ) AS items
      FROM orders
      JOIN order_items ON orders.id = order_items.order_id
      JOIN products ON order_items.product_id = products.id
      WHERE orders.id = ? AND orders.user_id = ?
      GROUP BY orders.id
      `;
      const result = await knex.raw(query, [orderId, userId]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async insertOrder(
    userId: string,
    paymentMethod: string,
    paymentStatus: string,
    amount: number,
    orderItems: { product_id: string; quantity: number }[],
  ) {
    const trx = await knex.transaction();

    try {
      // Insert order
      const orderQuery = `
        INSERT INTO orders (user_id, payment_method, amount, payment_status)
        VALUES (?, ?, ?, ?)
        RETURNING id
      `;
      const orderResult = await trx.raw(orderQuery, [
        userId,
        paymentMethod,
        amount,
        paymentStatus,
      ]);
      const orderId = orderResult.rows[0].id;

      // Insert order items
      const orderItemsQuery = `
        INSERT INTO order_items (order_id, product_id, quantity)
        VALUES (?, ?, ?)
      `;
      for (const item of orderItems) {
        await trx.raw(orderItemsQuery, [
          orderId,
          item.product_id,
          item.quantity,
        ]);
      }

      await trx.commit();
      return orderId;
    } catch (error) {
      console.log(error);
      await trx.rollback();
      throw error;
    }
  }
}

export default new OrderRepository();
