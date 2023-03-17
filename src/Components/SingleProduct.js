import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct, createCartItem, getCart } from "../api/helpers";


const SingleProduct = (props) => {
    const { products, setProducts, currentCart, setCurrentCart, me } = props;

    const [cartItems, setCartItems] = useState([])
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

    console.log(me)

    console.log(products.name)

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

    return (
        products ?
            <div className="productView">
                <div className="productImage">
                    <img src={products.photos} alt={products.name} />
                </div>
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
                            <p>${products.price.toFixed(2)}</p>
                        }
                        <button className="productAddToCart" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
            : null

    )
}

export default SingleProduct;