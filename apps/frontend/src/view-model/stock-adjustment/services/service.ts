/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestBody } from "@/lib/API/type";
import HTTP from "@/lib/API/HTTP";

class StockAdjustmentService {
  public static async createStockAdjustment(
    payload: RequestBody
  ): Promise<any> {
    const url = "/stock-adjustment/create";
    const res = await HTTP.post(url, payload);
    return res;
  }
}

export default StockAdjustmentService;
