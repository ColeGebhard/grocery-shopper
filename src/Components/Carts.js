import React, { useEffect } from "react";
import { getAllCartItems } from "../api/helpers";
import "../index.css"

const Carts = (props) => {
  const {currentCart, setCurrentCart, allCarts, setAllCarts, products } = props;

  useEffect(() => {
    try {
      getAllCartItems()
        .then((carts) => {
            setAllCarts(carts);
        });
      } catch (e)  {
            console.error('Failed to get all carts');
            throw e;
        };
      }, [setAllCarts] );
  console.log("Carts with items:", allCarts);
  // console.log("Cart items:", cartItems);

  return (
    <>
      <h2>All Carts</h2>
      {allCarts.map((cart) => {
        return (
          <div key={cart.price}>Cart ID: {cart.id}
            <div>{cart.userId}</div>
            <div>{cart.status}</div>
          </div>
        )
      })}
    </>
  )
}

// Cart work suspended until products are further along 

export default Carts;