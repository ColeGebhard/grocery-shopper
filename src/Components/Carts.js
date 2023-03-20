import React, { useEffect } from "react";
import { getAllCartItems } from "../api/helpers";
import "../index.css"
import "./Carts.css"

const Carts = (props) => {
  const {currentCart, setCurrentCart, allCarts, setAllCarts, products } = props;

  console.log(currentCart.items)

  // useEffect(() => {
  //   try {
  //     getAllCartItems()
  //       .then((carts) => {
  //           setAllCarts(carts);
  //       });
  //     } catch (e)  {
  //           console.error('Failed to get all carts');
  //           throw e;
  //       };
  //     }, [setAllCarts] );
  // console.log("Carts with items:", allCarts);
  // console.log("Cart items:", cartItems);

  return (
    <>
      <div id="fullCart" >
        <h2>Cart</h2>
        {currentCart.items.map((item) => {
          return (
            <div key={item.id} className="individualCartItem" > {item.name}
              <img alt={item.name} src={require(`../img/${item.photos}`)} ></img>
              <div> Quantity: <span> {item.quantity} </span></div>
              <div> Price: {item.price}</div>
            </div>
          )
        })}
        <div>Total: </div>
      </div>
    </>
  )
}

// Cart work suspended until products are further along 

export default Carts;