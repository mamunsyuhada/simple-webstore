import productRepository from "./repository";

class ProductService {
  async updateStock(productId: string, quantity: number) {
    // Fetch the current stock of the product
    const product = await this.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Calculate the new stock
    const newStock = product.stock - quantity;
    if (newStock < 0) {
      throw new Error("Insufficient stock");
    }

    // Update the stock in the repository
    await productRepository.updateStock(productId, newStock);
  }

  async getProductById(productId: string) {
    return await productRepository.getProductById(productId);
  }

  async getPaginatedProducts(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const products = await productRepository.getPaginatedProducts(
      limit,
      offset,
    );
    const total = await productRepository.getTotalProductsCount();

    return {
      meta: {
        total: total || 0,
        page,
        limit,
      },
      data: products,
    };
  }
}

export default new ProductService();
