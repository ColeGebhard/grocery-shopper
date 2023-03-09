const client = require("./client")

async function createCarts({
    userId,
    status
}) {
    try {
        const { rows: [cart] } = await client.query(`
        INSERT INTO carts("userId",status)
        VALUES ($1,$2)
        RETURNING *
        `, [
            userId,
            status
        ]);

        return cart
    } catch (error) {
        throw Error(error);
    }
}

async function createCartItems({
    cartId,
    productId,
    quantity,
    price,
    isActive
}) {
    try {
        const { rows: [cartItem] } = await client.query(`
        INSERT INTO cart_items(
            "cartId",
            "productId",
            quantity,
            price,
            "isActive"
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *;
        `, [ cartId, productId, quantity, price, isActive ])

        return cartItem;
    } catch (error) {
        throw Error(error)
    }
}

async function getAllCarts() {

    try {
      const { rows } = await client.query(`
      SELECT *
      FROM carts;
      `);
  
      return rows;
    } catch (error) {
      throw Error('Cannot get carts')
    }
  }

async function getAllCartItems() {

    try {
      const { rows } = await client.query(`
      SELECT *
      FROM cart_items;
      `);
  
      return rows;
    } catch (error) {
      throw Error('Cannot get carts')
    }
  }

module.exports = {
    createCarts,
    createCartItems, 
    getAllCarts, 
    getAllCartItems
}