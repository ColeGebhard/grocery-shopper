import React from 'react';
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { clearCartItems } from '../api/helpers';

export const Checkout = (props) => {
  const { currentCart, setCurrentCart } = props;
  const navigate = useNavigate();

//     const handleAddToCart = async () => {
//   try {
//     const cartId = localStorage.getItem('cartId');
//     if (!cartId) {
//         console.error('Error: No cart found');
//         return;
//     }

//     // Add the item to the cart
//     const cartItem = await createCartItem({ cartId, productId: products.id, quantity: quantity || 1 });
//     if(cartItem.error){
//         alert(`${products.name} already in cart`)
//     }
//     // Update the cart in state
//     if(!cartItem.error){const updatedCart = await getCart(cartId);
//     setCurrentCart(updatedCart);

//     alert(`${quantity} ${products.name} has been added to cart`)}
// } catch (error) {
//     console.error(error);
// }
// };

// const clearCart = useCallback(() => {
//   const confirm = window.confirm('Are you sure you wish to logout? All cart progress will be lost.')
//   if (confirm) {
//     localStorage.removeItem('cartId');

//     window.location.replace('http://localhost:3000/#/');
//     window.location.reload();
//     window.alert('Log out success');
//   }
// }, []);

  const handleSubmission = (e) => {
    try {
      e.preventDefault();
      currentCart.items = [];
      // const cartId = currentCart.id;
      // clearCartItems(cartId);
      console.log(currentCart);
      navigate("/checkout/success")
      
      return (
        <div>
          <div>
            Thank for for placing an order with us! 
            We will send you a confirmation email when
            your order is ready for pickup
          </div>
          <button
            onClick={() => navigate("/")}
          >Home</button>
        </div>
      ) }
    catch (e) {
      console.error("Failure to checkout", e)
    }
  }


    return (
      <form> 
        <section id="contactInfo">
          <h3>1. Your Contact Information</h3>
          <input 
            placeholder="First Name"
          />
          <input 
            placeholder="Last Name"
          />
        </section>
        <section id="billingAddress">
          <h3>2. Billing Address</h3>
          <input 
            placeholder="Street Address" 
          />
          <input 
            placeholder="Apt, Suite, etc. (optional)" 
          />
          <input 
            placeholder="ZIP Code Only" 
          />
        </section>
        <section id="paymentInfo">
          <h3>Payment</h3>
          <input
            placeholder="Credit/Debit Card Number"
          />
          <input 
            placeholder="Exp. MM/YY"
          />
          <input 
            placeholder="CVV"
          />
        </section>
        <button
          onClick={(e) => handleSubmission(e)}
        >Place Order</button>
      </form>
    )
}

export const CheckoutSuccess = (props) => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/")
  }

  const clearCart = useCallback(() => {

      localStorage.removeItem('cartId');
  
      navigate('/')
      window.location.reload();
    
  }, []);

  return (
    <div>
      <div>
        Thank for for placing an order with us! 
        We will send you a confirmation email when
        your order is ready for pickup
      </div>
      <button
        onClick={() => clearCart()}
      >Home</button>
    </div>
  )
}