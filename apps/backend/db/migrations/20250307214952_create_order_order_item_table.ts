import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TYPE payment_method_enum AS ENUM ('cash', 'cashless');
    CREATE TYPE payment_status_enum AS ENUM ('pending', 'completed', 'failed');

    CREATE TABLE orders (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL,
      payment_method payment_method_enum NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      payment_status payment_status_enum NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );

    CREATE TABLE order_items (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      order_id UUID NOT NULL,
      product_id UUID NOT NULL,
      quantity INTEGER NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_order
        FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,
      CONSTRAINT fk_product
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders;
    DROP TYPE IF EXISTS payment_method_enum;
    DROP TYPE IF EXISTS payment_status_enum;
  `);
}
