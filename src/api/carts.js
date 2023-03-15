const express = require("express");
const cartsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { createCartItems, createCarts, getAllCarts, getAllCartsWithItems } = require("../db");

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

cartsRouter.post('/cart/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
      const productToCart = await createCartItems({ 
          productId,
 })

          console.log(productToCart)

      res.send(productToCart)
  } catch ({name, message}) {
      next({ name, message})
  }
})

// Cart work paused until products are further along

module.exports = cartsRouter;