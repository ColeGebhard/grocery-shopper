const express = require('express');
const productsRouter = express.Router();

const {
    getAllCategorys,
    createCategory,
    getAllProducts,
    createProduct,
    getAllProductsWithCategoryId
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
        const products = await getAllProductsWithCategoryId()

        res.send(
            products
        )
    } catch (error) {
        next(error);
    }
})

productsRouter.post('/', async (req, res, next) => {
    try {
        if (req.isAdmin) {
            
            const { name } = req.body

            const category = await createCategory({ name })

            res.send(category)
        }
    } catch (error) {
        next(error)
    }
})

productsRouter.post('/:categoryId/products', async (req, res, next) => {
    const { categoryId } = req.params;
    const { 
    name,
    description,
    price,
    photos,
    quanity } = req.body;

    try {
        const productToCategory = await createProduct({ 
            categoryId,
            name,
            description,
            price,
            photos,
            quanity })

            console.log(productToCategory)

        res.send(productToCategory)
    } catch ({name, message}) {
        next({ name, message})
    }
})

module.exports = productsRouter