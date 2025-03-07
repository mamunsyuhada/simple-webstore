import * as JWT from "jsonwebtoken";

import knex from "./helpers/pg.conn";
import { infras } from "./configs/env.config";

export const utils = {
  isJSON: (data: string) => {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  },

  getTime: (): number => {
    return new Date().getTime();
  },

  healthCheck: async (): Promise<void> => {
    try {
      await knex.raw("SELECT 1");
    } catch (e) {
      throw new Error(`Health check failed: ${e.message}`);
    }
  },

  getTokenFromHeader: (
    authorizationHeader: string | undefined,
  ): string | null => {
    if (!authorizationHeader) return null;
    const token = authorizationHeader.replace("Bearer ", "");
    return token || null;
  },

  verifyToken: (token: string): any => {
    try {
      return JWT.verify(token, infras.APP_JWT_SECRET);
    } catch (e) {
      return null;
    }
  },
};
