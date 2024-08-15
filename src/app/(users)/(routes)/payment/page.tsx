'use client'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { FC } from "react";
import CheckoutForm from "../checkoutpayment/CheckoutFrom";



// Load Stripe outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_PK as string);

const Payment: FC = () => {
  return (
    <div className="bg-base-200 mt-12">
      <h1 className="bg-blue text-center shadow-2xl  font-sans text-xl"> stripe-payment-gateway</h1>
      <Elements stripe={stripePromise}>
        <div className="card p-3 gap-2 w-full h-fit">
          <CheckoutForm />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;

