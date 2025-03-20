import Knex from "knex";
import { infras } from "../configs/env.config";

const knex = Knex({
  client: "pg",
  connection: {
    connectionString: infras.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  pool: { min: 2, max: 10 }, // Connection pooling
});

export default knex;
