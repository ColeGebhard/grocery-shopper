const client = require("./client");

async function createCategory({name}) {
    try {
      const {
        rows: [category]
      } = await client.query(`
        INSERT INTO product_category (name)
        VALUES ($1)
        ON CONFLICT DO NOTHING
        RETURNING *
      `, [name]);

      return category;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

module.exports = {
    createCategory,
}