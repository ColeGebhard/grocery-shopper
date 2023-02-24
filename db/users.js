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
      ON CONFLICT (username, email) DO NOTHING
      RETURNING username, email
    `, [username, hashedPassword, fullName, email]);
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
}