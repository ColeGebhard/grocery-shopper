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

    console.log(products.name)

    const handleAddToCart = async () => {
        const cartId = currentCart.id; // Replace this with the actual cart ID
        const productId = products.id;
        const quantity = products.quantity; // Replace this with the desired quantity
        const cartItem = await createCartItem({
            cartId,
            productId,
            quantity
        });
        // Update the cart in your frontend with the added product
        return cartItem;
    };




    console.log(currentCart)

    return (
        products ?

            // <div className="productContainer">
            //     <div className="productImageContainer">
            //         {products.photos ?
            //             <img
            //                 className="productImageSingleView"
            //                 src={products.photos}
            //                 alt='food'
            //             /> :
            //             null
            //         }
            //     </div>
            //     <div className="productDetailsContainer">
            //         <h2 className="productName">{products.name}</h2>
            //         <p className="productDescription">{products.description}</p>
            //         <p className="productPrice">${products.price.toFixed(2)}</p>
            //         <div className="productQuantityContainer">
            //             <button
            //                 className="quantityButton"
            //                 disabled={products.quantity <= 1}
            //                 // onClick={() => handleQuantityChange(-1)}
            //             >
            //                 -
            //             </button>
            //             {/* <span className="productQuantity">{quantity}</span> */}
            //             <button
            //                 className="quantityButton"
            //                 disabled={products.quantity <= 0}
            //                 // onClick={() => handleQuantityChange(1)}
            //             >
            //                 +
            //             </button>
            //         </div>
            //         <button
            //             className="addToCartButton"
            //             onClick={handleAddToCart}
            //             disabled={products.quantity <= 0}
            //         >
            //             Add to Cart
            //         </button>
            //     </div>
            // </div>
            <div className="productView">
                <div className="productImage">
                    <img src={products.photos} alt={products.name} />
                </div>
                <div className="productDetails">
                    <h2>{products.name}</h2>
                    <p className="productDescription">{products.description}</p>
                    <div className="productInfo">
                        {products.price &&
                            <p>{products.price.toFixed(2)}</p>
                        }
                        <button className="productAddToCart" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
            : null

    )
}

export default SingleProduct;