const client = require("./client");

async function createCatagory(name) {
    try {
      const {
        rows: [catagory]
      } = await client.query(`
        INSERT INTO product_category (name)
        VALUES ($1)
        ON CONFLICT DO NOTHING
        RETURNING name
      `, [name]);
      // the on conflict should also include username, investigate later -AD
  
      return catagory;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

module.exports = {
    createCatagory
}