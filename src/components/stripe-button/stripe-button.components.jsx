import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HkmaZFSsBNxxNv9YsbEuYUArdX13Zi7xUyGPd3MXECmZHarqMgvPOBl7OWjLvDDg7T4WgxUQaXUOBuT1wunAhi900ZkK7GWyP";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="X-tech Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is RM${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      currency="MYR"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
export default StripeCheckoutButton;
