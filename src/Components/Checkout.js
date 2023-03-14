// Ideally, a link from the cart's page
// will send a user to the checkout

// Done! The Stripe CLI is configured for your account with account id acct_1MlLAlJouxuyxdek

import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
 
// export default class TakeMoney extends React.Component {
  const onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
 
  // ...

    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_51MlLAlJouxuyxdekLYvryea4uUKErAMEohai266tX5ketGmhey1CHywSSvDdkIkf6bkobAzgJrtTXcYXvRYJmodB004uqePot6"
      />
    )
}