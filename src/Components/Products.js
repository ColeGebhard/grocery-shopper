import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

    const productSubmit = async (e) => {
        e.preventDefault();
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

    console.log(categories)

    const { categoryName } = useParams();

    const filteredProducts = products.filter(product => product.categoryName === categoryName)
    console.log(filteredProducts)
    return (
        <>
            <form id="loginForm" onSubmit={productSubmit}>

                <select name="categoryDrop" id="categoryDrop"
                    value={categoryList}
                    onSelect={(e) => {
                        setCategoryList(e.target.value)
                    }}
                >
                    <option value="any">Any</option>
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
                    value={photos}
                    onChange={(e) => setPhotos(e.target.value)}
                />
                <button type="submit">Make a Product</button>
            </form>

            <h1>{categoryName}</h1>
            {filteredProducts.map((product) => {
                return (
                    <div>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <img alt="Stuff">{product.photos}</img>
                    </div>
                )
            })}
        </>
    )

}

export default Products;