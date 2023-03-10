import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Buffer} from 'buffer';
import { getAllProducts, createProducts, getAllCategories } from "../api/helpers";

const Products = (props) => {
    const { products, setProducts, categories, setCategories } = props;

    const [categoryList, setCategoryList] = useState('any');
    const [availible, setAvailible] = useState(true);
    const [name, setName] = useState("");
    const [description, setDesciption] = useState("");
    const [price, setPrice] = useState(0);
    const [quanity, setQuanity] = useState(5);
    const [photos, setPhotos] = useState(null);
    const [categoryId, setCategoryId] = useState(0)

    // console.log(photos)
    


    useEffect(() => {
        getAllProducts()
            .then((products) => {
                setProducts(products);
            })
            .catch((e) => {
                console.error('Failed to get products')
            });
    }, [setProducts])

    useEffect(() => {
        getAllCategories()
            .then((categories) => {
                setCategories(categories);
            })
            .catch((e) => {
                console.error('Failed to get category')
            });
    }, [setCategories])

    // console.log(photos)

    const productSubmit = async (e) => {
        e.preventDefault();

        if (e) {const filteredCategory = await categories.filter(category => category.name === categoryList)
        console.log(filteredCategory[0].name)
        console.log(categoryList)

        if (filteredCategory[0].name !== categoryList) {
            window.alert('Error')
        }

        if (filteredCategory[0].name === categoryList) {
            window.alert('Success')
        }
        setCategoryId(filteredCategory[0].id)}

        console.log(photos)
        try {
            const result = await createProducts({
                categoryId,
                name,
                description,
                price,
                photos,
                quanity,
            });

            console.log(result)
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {

        }
    }

    const onChangePicture = e => {
        console.log('picture: ', photos);
        console.log(e.target.files[0])
        setPhotos(e.target.files[0]);
        console.log('picture: ', photos);
    };

    const generateImageFromBuffer = (photos) => {
        const test = new Buffer.from(photos, 'base64')
        console.log(test.toString('base64'))
        return test.toString('base64')
    }

    // console.log(categories)

    const { categoryName } = useParams();

    const filteredProducts = products.filter(product => product.categoryName === categoryName)
    // console.log(filteredProducts)
    return (
        <>
            <form id="loginForm" onSubmit={productSubmit}>

                <select name="categoryDrop" id="categoryDrop"
                    value={categoryList}
                    onChange={(e) => {
                        setCategoryList(e.target.value)
                    }}
                >
                    <option value="any">Select A Category</option>
                    {categories.map((category) =>
                        <option value={category.name} key={category.name}>{category.name}</option>
                    )};
                </select>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDesciption(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quanity"
                    value={quanity}
                    onChange={(e) => setQuanity(e.target.value)}
                />
                <input
                    type="file"
                    placeholder="Category"
                    accept="image/*"
                    onChange={onChangePicture}
                    
                />
                <button type="submit">Make a Product</button>
            </form>

            <h1>{categoryName}</h1>
            {filteredProducts.map((product) => {
                if (product.photos !== null) {
                    generateImageFromBuffer(product.photos)
                }
                return (
                    <div>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        {product.photos === null ?
                        <p>placeholder</p>
                        : <img alt="Product Img" src={product.photos}></img>
                        }
                    </div>
                )
            })}
        </>
    )

}

export default Products;