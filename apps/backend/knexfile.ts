import dotenv from 'dotenv';
dotenv.config();

import type { Knex } from "knex";
import { infras } from "./src/configs/env.config";

const config: Knex.Config = {
  client: "pg",
  connection: infras.DATABASE_URL,
  migrations: {
    directory: "./db/migrations",
    extension: "ts",
  },
  seeds: {
    directory: "./db/seeds",
    extension: "ts",
  },
  pool: { min: 2, max: 10 },
};

export default config;
