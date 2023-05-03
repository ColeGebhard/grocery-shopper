import React, { useState, useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getSingleProduct, createCartItem, getCart, getAllProducts } from "../api/helpers";


const SingleProduct = (props) => {
    const navigate = useNavigate();

    const { products, setProducts, currentCart, setCurrentCart, me } = props;

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        setQuantity(newQuantity > 0 ? newQuantity : 1);
      }; 


    const { prodId } = useParams()

    console.log(prodId)

    console.log(products)

    useEffect(() => {
        getAllProducts()
          .then((products) => {
            console.log(products); // log the received products
            setProducts(products);
          })
          .catch((e) => {
            console.error('Failed to get products')
          });
      }, [setProducts])


    // useEffect(() => {
    //     getSingleProduct(prodId)
    //         .then((products) => {
    //             setProducts(products);
    //         })
    //         .catch((e) => {
    //             console.error('Failed to get products')
    //         });
    // }, [setProducts, prodId])

    const handleAddToCart = async () => {

        console.log(filtProduct)
        try {
            const cartId = localStorage.getItem('cartId');
            if (!cartId) {
                console.error('Error: No cart found');
                return;
            }
    
            console.log('Cart ID:', cartId);
            console.log('Product ID:', filtProduct.id);
            console.log('Quantity:', quantity || 1);
    
            // Add the item to the cart
            const cartItem = await createCartItem({ cartId, productId: filtProduct.id, quantity: quantity || 1 });
            console.log('Cart Item:', cartItem);
    
            if (cartItem.error) {
                alert(`${filtProduct.name} already in cart`);
            }
    
            // Update the cart in state
            if (!cartItem.error) {
                const updatedCart = await getCart(cartId);
                console.log('Updated Cart:', updatedCart);
                setCurrentCart(updatedCart);
    
                alert(`${quantity} ${filtProduct.name} has been added to cart`);
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    console.log(currentCart)
    console.log(products)
    const filteredProduct = Array.isArray(products) && products.length > 0 ? products.filter(product => product.id == prodId) : [];

    console.log(filteredProduct[0])

    const filtProduct = filteredProduct[0]

    console.log(filtProduct)

    return (
        filtProduct ?
            <div className="productView">
                <div className="productNav">
                    <a id=""href="/">All Products |</a>
                    <p></p>
                    {/* <a href={'/category/' + products.categoryName}>| {products.categoryName}</a> */}
                </div>
                <div className="productImage">
                    {filtProduct.photos &&
                        <img 
                        src={
                            filtProduct.photos.startsWith('http') || filtProduct.photos.startsWith('https')
                              ? filtProduct.photos
                              : require(`../img/${filtProduct.photos}`)
                          }                        alt={filtProduct.name} />
                    }                </div>
                <div className="productDetails">
                    <h2>{filtProduct.name}</h2>
                    <p className="productDescription">{filtProduct.description}</p>
                    <div className="productInfo">
                        <button
                            className="quantityButton"
                            disabled={filtProduct.quantity <= 1}
                            onClick={() => handleQuantityChange(-1)}
                        >
                            -
                        </button>
                        <span className="productQuantity">{quantity}</span>
                        <button
                            className="quantityButton"
                            disabled={filtProduct.quantity <= 0}
                            onClick={() => handleQuantityChange(1)}
                        >
                            +
                        </button>
                        {filtProduct.price &&
                            <p>${(filtProduct.price * quantity).toFixed(2)}</p>
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