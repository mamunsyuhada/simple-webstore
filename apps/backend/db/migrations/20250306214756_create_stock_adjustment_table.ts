import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE stock_adjustments (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      product_id UUID NOT NULL,
      adjustment INTEGER NOT NULL,
      reason TEXT,
      adjustor UUID NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_product
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,
      CONSTRAINT fk_adjustor
        FOREIGN KEY(adjustor)
        REFERENCES users(id)
        ON DELETE SET NULL
    );
    `,
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(
    `
    DROP TABLE IF EXISTS stock_adjustments;
    `,
  );
}
