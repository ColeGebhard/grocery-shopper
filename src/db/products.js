const client = require("./client");

async function createProduct({ 
    name,
    description,
    price,
    photos, 
    categoryId, 
    isAvailible, 
    creatorId,
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
      FROM products
    `);

    console.log('PRODUCTS:', rows);


    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('Cannot get products');
  }
}


async function getProductById(id) {

  try {
    const { rows: [product] } = await client.query(`
    SELECT products.*,
    product_category.name AS "categoryName"
    FROM products
    JOIN product_category ON products."categoryId" = product_category.id
    WHERE product_category.id=${id};
    `);

    if (!product) {
      return null
    }

    return product;
  } catch (error) {
    throw Error('Cannot get products')
  }
}

// async function getAllProductsWithCategoryId() {
//     try {
//         const { rows } = await client.query(`
//         SELECT products.*,
//         product_category.name AS "categoryName"
//         FROM products
//         JOIN product_category ON products."categoryId" = product_category.id
//         `)

//         console.log(rows)

//         return rows;
//     } catch (error) {
//         throw Error('Cannot get products')
//     }
// }

async function getAllProductsWithCategoryId(id) {
  try {
      const { rows } = await client.query(`
      SELECT products.*,
      product_category.name AS "categoryName"
      FROM product_category
      JOIN products ON products."categoryId" = product_category.${id}
      `)

      console.log(rows)

      return rows;
  } catch (error) {
      throw Error('Cannot get products')
  }
}

async function deleteProduct(id) {
  try {
    await client.query(`
    DELETE FROM
    products
    WHERE id = ${id}
    `);

  } catch (error) {
    throw Error('Failed to delete', error)
  }
}

module.exports = {
    createProduct,
    createReview,
    getAllProducts,
    getAllProductsWithCategoryId,
    getProductById,
    deleteProduct
}