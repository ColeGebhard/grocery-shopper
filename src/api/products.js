const express = require('express');
const productsRouter = express.Router();

const {
    getAllCategorys,
    createCategory,
    getAllProducts
} = require('../db')

productsRouter.use((req, res, next) => {
    console.log('Product req being made')
    next();
})

productsRouter.get('/health', async (req, res, next) => {
    res.send({message: "All is well."});
    next();
  });

productsRouter.get('/', async (req, res, next) => {

    try {
        const catagories = await getAllCategorys()

        res.send(
            catagories
        )
    } catch (error) {
        next(error);
    }
})

productsRouter.get('/products', async (req, res, next) => {

    try {
        const products = await getAllProducts()

        res.send(
            products
        )
    } catch (error) {
        next(error);
    }
})

module.exports = productsRouter