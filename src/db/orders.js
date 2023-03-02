const client = require("./client")

async function createOrders({
    userId,
    status
}) {
    try {
        const { rows: [order] } = await client.query(`
        INSERT INTO orders("userId",status)
        VALUES ($1,$2)
        RETURNING *;
        `, [
            userId,
            status
        ]);

        return order;
    } catch (error) {
        throw Error(error);
    }
}

async function createOrderItems({
    orderId,
    productId,
    quantity,
}) {
    try {
        const { rows: [orderItems] } = await client.query(`
        INSERT INTO order_items(
            "orderId",
            "productId",
            quantity
        )
        VALUES ($1,$2,$3)
        RETURNING *;
        `, [ orderId, productId, quantity ])

        return orderItems;
    } catch (error) {
        throw Error(error)
    }
}

module.exports = {
    createOrders,
    createOrderItems
}