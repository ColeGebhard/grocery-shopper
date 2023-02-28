const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser({username, password, fullName, email}) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [user]
    } = await client.query(`
      INSERT INTO users (username, password, "fullName", email)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ON CONSTRAINT UNIQUE DO NOTHING
      RETURNING username, email, "fullName"
    `, [username, hashedPassword, fullName, email]);
    // the on conflict should also include username, investigate later -AD

    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = {
  createUser
};