/* eslint-disable @typescript-eslint/no-explicit-any */
import { requestParams } from "@/lib/API/type";
import { ErrorResponse } from "../type";
import HTTP from "@/lib/API/HTTP";

class ProductService {
  public static async deleteProduct(productId: string) {
    const url = `/product/${productId}`;
    const res = await HTTP.delete(url);
    return res;
  }

  public static async updateProduct(
    id: string,
    product: {
      title: string;
      price: string | number;
      description: string;
      category: string;
      image: string;
    },
  ) {
    const url = `/product/${id}`;
    const res = await HTTP.put(url, product);
    return res;
  }
  public static async listProduct(
    payload: requestParams,
  ): Promise<any | ErrorResponse> {
    const url = "/product";
    const res = await HTTP.get(url, payload);
    return res;
  }

  public static async createProduct(
    payload: requestParams,
  ): Promise<any | ErrorResponse> {
    const url = "/product";
    const res = await HTTP.post(url, payload);
    return res;
  }
}

export default ProductService;
