const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser({username, password, firstName, lastName, email, isAdmin}) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [user]
    } = await client.query(`
      INSERT INTO users (username, password, "firstName", "lastName", email, "isAdmin")
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT DO NOTHING
      RETURNING *
    `, [username, hashedPassword, firstName, lastName, email, isAdmin]);
    // the on conflict should also include username, investigate later -AD
    delete user.password
    if (isAdmin === null){
      return isAdmin.false
    }


    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function getUser({ username, password }) {

  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const isValid = await bcrypt.compare(password, hashedPassword);
  try{
     const { rows:[user] } = await client.query(`
     SELECT *
     FROM users
     WHERE username=$1
     AND password=$2;
     `, [username, hashedPassword])
    if (!isValid) {
      return null;
    }
     delete user.password;

     return user;
  } catch (error) {
    return null;
  }
}

async function getUserById(id) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT id, username
      FROM users
      WHERE id=${ id };
    `, );

    if (!user) {
      return null
    }

    return user;
  } catch (error) {
    throw Error('could not get posts');
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1;
    `, [username]);

    return user;
  } catch (error) {
    throw Error('Could not get user');
  }
}

async function getAdmin(userId) {
  try {
    const { rows } = await client.query(`
      SELECT id, username, "firstName", "lastName", email, "isAdmin", "isActive"
      FROM users
      WHERE id=$1;
    `, [userId]);

    const user = rows[0];

    if (user.isAdmin) {
      return {
        ...user,
        adminData: "This is special data for admins only"
      }
    }

    return user;

  } catch (error) {
    throw new Error(`Failed to get user with id ${userId}: ${error.message}`);
  }
}


module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername
};