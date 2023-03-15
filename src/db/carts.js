const client = require("./client")

// async function getCartByUserId(userId) {
//     try {

//     }
// }

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




// Ignore the next two for now. Replace by getAllCartsWithItems

// async function getAllCarts() {

//     try {
//       const { rows } = await client.query(`
//       SELECT *
//       FROM carts;
//       `);
  
//       return rows;
//     } catch (error) {
//       throw Error('Cannot get carts')
//     }
//   }

// async function getAllCartItems() {

//     try {
//       const { rows } = await client.query(`
//       SELECT *
//       FROM cart_items;
//       `);
  
//       return rows;
//     } catch (error) {
//       throw Error('Cannot get cart items')
//     }
//   }



async function getAllCartsWithItems() {
    try {
        const { rows } = await client.query(`
        SELECT carts.*,
        id 
        FROM cart_items
        JOIN carts ON cart_items."cartId" = carts.id
        `)

        console.log(rows)

        return rows;
    } catch (error) {
        throw Error('Cannot get carts with items')
    }
}

module.exports = {
    createCarts,
    createCartItems, 
    getAllCartsWithItems
}

// Cart work suspended until products finished