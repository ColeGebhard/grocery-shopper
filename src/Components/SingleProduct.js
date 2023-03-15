import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../api/helpers";


const SingleProduct = (props) => {
    const { products, setProducts, currentCart, setCurrentCart } = props;

    const [cartItems, setCartItems] = useState([])

    const { prodId } = useParams()

    useEffect(() => {
        getSingleProduct(prodId)
            .then((products) => {
                setProducts(products);
            })
            .catch((e) => {
                console.error('Failed to get products')
            });
    }, [setProducts, prodId])

    console.log(products)



    return (
        products ?

            <div>
                <h2>{products.name}</h2>
                <p>{products.description}</p>
                <p>{products.price}</p>
                {products.photos ?
                    <img
                        className="productPhoto"
                        src={products.photos}
                        alt='food'
                    /> :
                    null}
                <button className="button">
                    <span>Add to cart</span>
                </button>
            </div>
            : null

    )
}

export default SingleProduct;