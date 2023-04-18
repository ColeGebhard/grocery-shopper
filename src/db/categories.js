const client = require("./client");

async function createCategory({ name, photos }) {
  try {
    console.log('name:', name);
    console.log('photos:', photos);

    const { rows: [category] } = await client.query(
      `
      INSERT INTO product_category (name, photos)
      VALUES ($1, $2)
      RETURNING *
      `,
      [name, photos]
    );

    console.log('category:', category);

    return category;
  } catch (e) {
    console.error(e);
    throw e;
  }
}


async function getAllCategorys() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM product_category
      ORDER BY id ASC;
    `);

    return rows;
  } catch (error) {
    throw Error('Cannot get categories')
  }
}


async function getCategoryByName(name) {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM product_category
      WHERE name=$1;
    `, [name]);

    console.log('NAME',name)

    return rows
  } catch (error) {
    throw new Error(`Failed to get category with name ${name}: ${error.message}`);
  }
}

async function deleteCategory(id) {
  try {
    await client.query(`
    DELETE FROM
    product_category
    WHERE id = ${id}
    `);

  } catch (error) {
    throw Error('Failed to delete', error)
  }
}

module.exports = {
    createCategory,
    getAllCategorys,
    getCategoryByName,
    deleteCategory
}