import knex from "../../helpers/pg.conn";

class UserRepository {
  async getUserById(id: string) {
    const userQuery = `
      SELECT * FROM users WHERE id = ?
    `;
    const userResult = await knex.raw(userQuery, [id]);
    if (!userResult.rows.length) {
      return null;
    }
    return userResult.rows[0];
  }

  async getUserByEmail(email: string) {
    const userQuery = `
      SELECT * FROM users WHERE email = ?
    `;
    const userResult = await knex.raw(userQuery, [email]);
    if (!userResult.rows.length) {
      return null;
    }
    return userResult.rows[0];
  }
}

export default new UserRepository();
