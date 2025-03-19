import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw("DELETE FROM users");

  const users = [
    {
      id: uuidv4(),
      username: "admin",
      email: "admin@example.com",
      password: await bcrypt.hash("password123", 10),
      first_name: "Admin",
      last_name: "User",
      role: "admin",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      username: "customer",
      email: "customer@example.com",
      password: await bcrypt.hash("password123", 10),
      first_name: "Customer",
      last_name: "User",
      role: "customer",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  // Insert data using raw SQL
  for (const user of users) {
    await knex.raw(
      `
            INSERT INTO users (id, username, email, password, first_name, last_name, role, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
      [
        user.id,
        user.username,
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.role,
        user.created_at,
        user.updated_at,
      ],
    );
  }
}
