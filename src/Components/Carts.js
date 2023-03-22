import React, { useEffect } from "react";
import { getAllCartItems } from "../api/helpers";
import { useNavigate } from "react-router-dom";
import "./Carts.css"

const Carts = (props) => {
  const { currentCart, setCurrentCart, allCarts, setAllCarts, products } = props;

  const navigate = useNavigate();

  let currentCartQuantity = 0;
  let currentCartTotal = 0;
  if (currentCart.items) {
    currentCart.items.forEach(item => currentCartQuantity += item.quantity);
    currentCart.items.forEach(item => currentCartTotal += item.price * item.quantity)
  }

  const handleSubtraction = (e) => {
    console.log(e.target.nextSibling.innerText)
    // const newQuantity = this.quantity;
    // this.quantity = newQuantity > 0 ? newQuantity : 0;
  };

  const handleAddition = (e) => {
    console.log(e.target.previousSibling.innerText)
    // const newQuantity = this.quantity;
    // this.quantity = newQuantity > 0 ? newQuantity : 0;
  };

  console.log(currentCart);

  return (
    <div id="cartBody">
      <div id="fullCart" >
        <h2>Cart ({currentCartQuantity} items)</h2>
        {/* If the cart has items, display them.
        Otherwise, give a "No items!" message */}
        {currentCart.items ? currentCart.items.map((item) => {
          return (
            <div key={item.id} className="individualCartItem" >
              <div className="cartImage">
                {item.photos &&
                  <img
                    className="cartImage"
                    src={item.photos.startsWith('http') || item.photos.startsWith('https') ? item.photos : require(`../img/${item.photos}`)}
                    alt={item.name} />
                }                </div>
              <div className="cartItemTextContainer"> {item.name}
                <p> Quantity:
                  <button
                    className="quantityButton"
                    disabled={item.quantity < 1}
                    onClick={(e) => handleSubtraction(e)}
                  > -
                  </button>
                  <span> {item.quantity} </span>
                  <button
                    className="quantityButton"
                    disabled={item.quantity < 1}
                    onClick={(e) => handleAddition(e)}
                  > +
                  </button>
                </p>
                <p> Price: ${item.price * item.quantity}</p>
              </div>
            </div>
          )
        }) : <div id="noItems ">No items yet!</div>}
        <div id="bottomCartContainer">
          <div>Total: ${currentCartTotal}</div>
          <button
            id="checkoutButton"
            onClick={() => navigate("/checkout")}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  )
}

// Cart work suspended until products are further along 

export default Carts;