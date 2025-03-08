import knex from "../../helpers/pg.conn";

class CartRepository {
  async addItemToCart(userId: string, productId: string, quantity: number) {
    const query = `
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES (?, ?, ?)
      ON CONFLICT (user_id, product_id)
      DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
    `;
    await knex.raw(query, [userId, productId, quantity]);
  }

  async updateCartItem(userId: string, productId: string, quantity: number) {
    const query = `
      UPDATE cart_items
      SET quantity = ?
      WHERE user_id = ? AND product_id = ?
    `;
    await knex.raw(query, [quantity, userId, productId]);
  }

  async removeCartById(id: string) {
    const query = `
      DELETE FROM cart_items
      WHERE id = ?
    `;
    await knex.raw(query, [id]);
  }

  async clearCartById(id: string) {
    const query = `
      DELETE FROM cart_items
      WHERE id = ?
    `;
    await knex.raw(query, [id]);
  }

  async getCartItems(userId: string) {
    const query = `
      SELECT * FROM cart_items
      WHERE user_id = ?
    `;
    const result = await knex.raw(query, [userId]);
    return result.rows;
  }

  async getCartItemsByCartId(cartId: string) {
    const query = `
      SELECT ci.*, p.title, p.price, p.description
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.id = ?
    `;
    const result = await knex.raw(query, [cartId]);
    return result.rows;
  }
}

export default new CartRepository();
