import React, { useEffect } from "react";
import { getAllCarts, getAllCartItems } from "../api/helpers";
import "../index.css"

const Carts = (props) => {
  const {currentCart, setCurrentCart, allCarts, setAllCarts, products } = props;

  useEffect(() => {
    getAllCarts()
        .then((carts) => {
            setAllCarts(carts);
        })
        .catch((e) => {
            console.error('Failed to get all carts');
            throw e;
        });
}, [setAllCarts]);
  console.log(allCarts);
  getAllCartItems();

  return (
    <>
      <h2>All Carts</h2>
      {allCarts.map((cart) => {
        return (
          <div key={cart.id}>Cart ID: {cart.id}
            <div>{cart.userId}</div>
            <div>{cart.status}</div>
          </div>
        )
      })}
    </>
  )
}

export default Carts;