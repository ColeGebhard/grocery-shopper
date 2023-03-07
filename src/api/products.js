const express = require('express');
const productsRouter = express.Router();

const {
    getAllCategorys,
    createCategory,
    getAllProducts,
    createProduct
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

productsRouter.post('/', async (req, res, next) => {
    try {
        // if (req.isAdmin) {
            
            const { name } = req.body

            const catagory = await createCategory({ name })

            res.send(catagory)
        // }
    } catch (error) {
        next(error)
    }
})

productsRouter.post('/:categoryId/products', async (req, res, next) => {
    const { categoryId } = req.params;
    const { 
    creatorId,
    isAvailible,
    name,
    description,
    price,
    photos,
    quanity } = req.body;

    try {
        const productToCategory = await createProduct({ 
            categoryId,
            creatorId,
            isAvailible,
            name,
            description,
            price,
            photos,
            quanity })

        res.send(productToCategory)
    } catch ({name, message}) {
        next({ name, message})
    }
})

module.exports = productsRouter