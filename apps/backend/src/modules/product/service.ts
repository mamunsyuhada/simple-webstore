import productRepository from "./repository";

class ProductService {
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
