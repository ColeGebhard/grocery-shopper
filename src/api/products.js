const express = require('express');
const productsRouter = express.Router();

const {
    getAllCategorys,
    createCategory,
    getAllProducts,
    createProduct,
    getAllProductsWithCategoryId,
    getProductById
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

productsRouter.get('/:prodId', async (req, res, next) => {
    try {
        const product = req.params.prodId

        console.log(product)

        const singleProduct = await getProductById(product)

        console.log(singleProduct)

        if(singleProduct) {
            res.send(singleProduct);
        } else {
            res.send({name:"No id", message:"Nothing to display"})
        }

    } catch (error) {
        next({error})
    }
})

module.exports = productsRouter