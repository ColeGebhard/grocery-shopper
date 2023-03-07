import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts, createProducts } from "../api/helpers";

const Products = (props) => {
    const { products, setProducts } = props;

    const [availible, setAvailible] = useState(true);
    const [name, setName] = useState("");
    const [description, setDesciption] = useState("");
    const [price, setPrice] = useState(0);
    const [quanity, setQuanity] = useState(5);
    const [photos, setPhotos] = useState(null);


    useEffect(() => {
        getAllProducts()
            .then((products) => {
                setProducts(products);
            })
            .catch((e) => {
                console.error('Failed to get products')
            });
    }, [setProducts])

    const productSubmit = async (e) => {
        e.preventDefault();
        try {
              const result = await createProducts({
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

    const { categoryName } = useParams();

    console.log(JSON.stringify(categoryName))
    const filteredProducts = products.filter(product => product.categoryName === categoryName)
    console.log(filteredProducts)
    return (
        <>
            <form id="loginForm" onSubmit={productSubmit}>
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
                <button type="submit">Make Category</button>
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