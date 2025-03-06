import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TYPE user_role AS ENUM ('admin', 'customer');
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      role user_role NOT NULL DEFAULT 'customer',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
  );
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(
    `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TYPE IF EXISTS user_role;
    DROP TABLE IF EXISTS users;
    `
  );
}

