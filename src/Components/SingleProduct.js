import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct, createCartItem } from "../api/helpers";


const SingleProduct = (props) => {
    const { products, setProducts, currentCart, setCurrentCart, me } = props;

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

    console.log(me)

  const handleAddToCart = async () => {
    const cartId = currentCart.id; // Replace this with the actual cart ID
    const productId = products.id;
    const quantity = 1; // Replace this with the desired quantity
    const cartItem = await createCartItem({ cartId, productId, quantity });
    // Update the cart in your frontend with the added product
    return cartItem;
  };

  console.log(currentCart)

    return (
        products ?

            <div>
                <h2>{products.name}</h2>
                <p>{products.description}</p>
                <p>{products.price}</p>
                {products.photos ?
                    <img
                        className="productPhotoSingleView"
                        src={products.photos}
                        alt='food'
                    /> :
                    null}
                <button 
                className="button"
                onClick={handleAddToCart}
               >
                    <span>Add to cart</span>
                </button>
            </div>
            : null

    )
}

export default SingleProduct;