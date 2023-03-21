import React, { useState, useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getSingleProduct, createCartItem, getCart } from "../api/helpers";


const SingleProduct = (props) => {
    const navigate = useNavigate();

    const { products, setProducts, currentCart, setCurrentCart, me } = props;

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        setQuantity(newQuantity > 0 ? newQuantity : 1);
      }; 


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

    const handleAddToCart = async () => {
        try {
            const cartId = localStorage.getItem('cartId');
            if (!cartId) {
                console.error('Error: No cart found');
                return;
            }

            // Add the item to the cart
            await createCartItem({ cartId, productId: products.id, quantity: quantity || 1 });

            // Update the cart in state
            const updatedCart = await getCart(cartId);
            setCurrentCart(updatedCart);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(currentCart)
    console.log(products)

    return (
        products ?
            <div className="productView">
                <div className="productNav">
                    <a href="/">View All Products</a>
                    <a href={'/category/' + products.categoryName}>{products.categoryName}</a>
                </div>
                <div className="productImage">
                    {products.photos &&
                        <img 
                        src={products.photos.startsWith('http') || products.photos.startsWith('https') ? products.photos : require(`../img/${products.photos}`)}
                        alt={products.name} />
                    }                </div>
                <div className="productDetails">
                    <h2>{products.name}</h2>
                    <p className="productDescription">{products.description}</p>
                    <div className="productInfo">
                        <button
                            className="quantityButton"
                            disabled={products.quantity <= 1}
                            onClick={() => handleQuantityChange(-1)}
                        >
                            -
                        </button>
                        <span className="productQuantity">{quantity}</span>
                        <button
                            className="quantityButton"
                            disabled={products.quantity <= 0}
                            onClick={() => handleQuantityChange(1)}
                        >
                            +
                        </button>
                        {products.price &&
                            <p>${(products.price * quantity).toFixed(2)}</p>
                        }{me ?
                        <button className="productAddToCart" onClick={handleAddToCart}>Add to Cart</button>
                    : <button className="productAddToCart" onClick={() => {navigate('/login')}}>Sign in to add</button>
                }</div>
                </div>
            </div>
            : null

    )
}

export default SingleProduct;