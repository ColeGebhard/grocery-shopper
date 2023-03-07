const client = require("./client");

async function createProduct({ 
    categoryId, 
    creatorId, 
    isAvailible,
    name,
    description,
    price,
    photos, 
    quantity
  }) {
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
        quantity
        )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
      `, [
        categoryId, 
        creatorId, 
        isAvailible,
        name,
        description,
        price,
        photos, 
        quantity
     ])
      return product;
    } catch (error) {
      throw Error(error)
    }
  }

async function createReview({ productId, userId, reviewRating, description}) {
  try {
    const { rows: [review] } = await client.query(`
    INSERT INTO reviews(
      "productId",
      "userId",
      "reviewRating",
      description
    )
    VALUES($1,$2,$3,$4)
    RETURNING *;
    `, [ 
      productId,
      userId,
      reviewRating,
      description
    ]);

    return review
  } catch (error) {
    throw Error(error)
  }
}


async function getAllProducts() {

  try {
    const { rows } = await client.query(`
    SELECT *
    FROM products;
    `);

    return rows;
  } catch (error) {
    throw Error('Cannot get products')
  }
}

async function attachProductsToCategory(catagory) {
  try {
    const { rows: product } = await client.query(`
    SELECT product.*`)
  } catch (error) {
    throw Error(error)
  }
}

module.exports = {
    createProduct,
    createReview,
    getAllProducts
}