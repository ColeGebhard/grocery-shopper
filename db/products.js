const client = require("./client");

async function createProduct({ 
    name,
    description,
    price,
    photos, 
    categoryId, 
    isAvailible, 
    creatorId,
    quanity }) {
    try {
      const { rows: [product] } = await client.query(`
      INSERT INTO products(
        "categoryId", 
        "creatorId", 
        "isAvailible",
        name,
        description, 
        price, 
        photos, 
        quanity
        )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
      `, [
        name,
        description,
        price,
        photos, 
        categoryId, 
        isAvailible, 
        creatorId,
        quanity
     ])
      return product;
    } catch (error) {
      throw Error(error)
    }
  }

module.exports = {
    createProduct
}