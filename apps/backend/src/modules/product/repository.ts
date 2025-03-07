import knex from "../../helpers/pg.conn";

class ProductRepository {
  async getProductById(id: string) {
    const productQuery = `
      SELECT * FROM products WHERE id = ?
    `;
    const productResult = await knex.raw(productQuery, [id]);
    if (!productResult.rows.length) {
      return null;
    }
    return productResult.rows[0];
  }

  async getPaginatedProducts(limit: number, offset: number) {
    const productsQuery = `
      SELECT * FROM products
      LIMIT ? OFFSET ?
    `;
    const products = await knex.raw(productsQuery, [limit, offset]);
    return products.rows;
  }

  async getTotalProductsCount() {
    const totalQuery = `
      SELECT COUNT(*) as count FROM products
    `;
    const total = await knex.raw(totalQuery);
    return total.rows[0].count;
  }
}

export default new ProductRepository();
