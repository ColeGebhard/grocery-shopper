const express = require("express");
const cartsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { 
  createCartItems, 
  createCarts, 
  getAllCarts, 
  getAllCartsWithItems, 
  getCartById, 
  attachCartItemsToCart,
  getCartItemsByCartId

} = require("../db");

cartsRouter.get('/health', async (req, res, next) => {
  res.send({message: "All is well."});
  next();
});

// This is for allCarts, should not be available to everyone. Admin only before deployment
cartsRouter.get('/', async (req, res, next) => {
  try {
      const allCarts = await getAllCarts()

      res.json(
          allCarts
      )
  } catch (error) {
      next(error);
  }
})

cartsRouter.get('/items', async (req, res, next) => {
  try {
    const cartItems = await getAllCartsWithItems();
    res.json(cartItems);
  } catch (e) {
    next(e);
  }
})

cartsRouter.get('/:cartId', async (req, res, next) => {
  const { cartId } = req.params;

  try {
      const cart = await getCartById(cartId);
      const cartItems = await getCartItemsByCartId(cartId)

      cart.items = cartItems;

      res.send(cart);
  } catch ({name, message}) {
      next({ name, message})
  }
})


cartsRouter.post('/:userId', async (req, res, next) => {
  const { userId } = req.params;

  console.log(userId)

  try {
      const productToCart = await createCarts({ 
          userId
 })

    console.log(productToCart)

      res.send(productToCart)
  } catch ({name, message}) {
      next({ name, message})
  }
})

cartsRouter.post('/:cartId/items', async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    const cartItem = await createCartItems({ cartId, productId, quantity });
    const updatedCartItem = await attachCartItemsToCart(cartId, cartItem.id);

    console.log(updatedCartItem)

    res.send(updatedCartItem);
  } catch (error) {
    next(error);
  }
});

// Cart work paused until products are further along

module.exports = cartsRouter;