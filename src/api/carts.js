const express = require("express");
const cartsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { createCartItems, createCarts, getAllCarts, getAllCartItems } = require("../db");

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
    const cartItems = await getAllCartItems();
    console.log(cartItems)
    // res.json(cartItems)
  } catch (e) {
    next(e);
  }
})

module.exports = cartsRouter;