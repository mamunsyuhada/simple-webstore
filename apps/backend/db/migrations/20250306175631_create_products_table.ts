import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE products (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
      description TEXT,
      category VARCHAR(255) NOT NULL,
      image TEXT NOT NULL,
      stock INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `,
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(
    `
    DROP EXTENSION IF EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS products;
    `,
  );
}
