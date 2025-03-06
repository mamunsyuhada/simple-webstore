import Knex from "knex";

const knex = Knex({
  client: "pg",
  connection: "postgres://vscode:notsecure@127.0.0.1:15432/simplewebstore",
  pool: { min: 2, max: 10 }, // Connection pooling
});

export default knex;
