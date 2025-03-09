/* eslint-disable @typescript-eslint/no-explicit-any */
import { requestParams } from "@/lib/API/type";
import { ErrorResponse } from "../type";
import HTTP from "@/lib/API/HTTP";

class ProductService {
  public static async listProduct(payload: requestParams): Promise<any | ErrorResponse>{
    const url = "/product";
    const res = await HTTP.get(url, payload);
    return res;
  }
}

export default ProductService;