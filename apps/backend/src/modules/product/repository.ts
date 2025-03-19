import knex from "../../helpers/pg.conn";

class ProductRepository {
  async deleteProduct(id: string) {
    const query = `
      DELETE FROM products
      WHERE id = ?
    `;
    await knex.raw(query, [id]);
  }

  async updateProduct(
    id: string,
    updates: {
      title?: string;
      price?: number;
      description?: string;
      category?: string;
      image?: string;
    },
  ) {
    const fields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    const query = `
      UPDATE products
      SET ${fields.join(", ")}
      WHERE id = ?
      RETURNING *
    `;
    values.push(id);

    const result = await knex.raw(query, values);

    return result.rows[0];
  }

  async createProduct(
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
  ) {
    const query = `
      INSERT INTO products (title, price, description, category, image)
      VALUES (?, ?, ?, ?, ?)
      RETURNING *
    `;
    const result = await knex.raw(query, [
      title,
      price,
      description,
      category,
      image,
    ]);
    return result.rows[0];
  }

  async updateStock(productId: string, newStock: number) {
    const query = `
      UPDATE products
      SET stock = ?
      WHERE id = ?
    `;
    await knex.raw(query, [newStock, productId]);
  }

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

  async getPaginatedProducts(
    limit: number,
    offset: number,
    orderBy: string = "updated_at",
    order: "asc" | "desc" = "asc",
  ) {
    const productsQuery = `
      SELECT * FROM products
      ORDER BY ${orderBy} ${order}
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
