import { useCreateStripePaymentIntentMutation } from "@/redux/features-slices/Payment/PaymentApiSlice";
import React from "react";


const PaymentButton = () => {
  const [createPaymentIntent] = useCreateStripePaymentIntentMutation();

  const handlePayment = async () => {
    try {
      await createPaymentIntent({ amount: 5000, currency: "usd" });
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return <button onClick={handlePayment}>Pay with Stripe</button>;
};

export default PaymentButton;
