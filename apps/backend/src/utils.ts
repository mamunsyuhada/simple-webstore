import knex from "./helpers/pg.conn";

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
};
