'use client'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, FormEvent } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import useAxiosSecure from "@/app/Hooks/AxiosSequre";
import useAuth from "@/app/Hooks/useAuth";
import useCart from "@/app/Hooks/usecart";

type PaymentIntent = {
  id: string;
  status: string;
};

type PaymentMethodResponse = {
  paymentMethod: any;
  error?: { message: string };
};

type PaymentConfirmationResponse = {
  paymentIntent: PaymentIntent;
  error?: { message: string };
};

type PaymentData = {
  email: string;
  price: number;
  transactionId: string;
  date: Date;
  cartIds: string[];
  menuItemIds: string[];
  status: string;
};

const CheckoutForm: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post<{ clientSecret: string }>("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error: paymentError, paymentMethod }: PaymentMethodResponse = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentError) {
      setError(paymentError.message || "Payment error occurred.");
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError }: PaymentConfirmationResponse = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment: PaymentData = {
        email: user?.email || "",
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map((item) => item._id),
        menuItemIds: cart.map((item) => item.menuId),
        status: "pending",
      };

      const res = await axiosSecure.post("/payments", payment);
      refetch();

      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          toast: true,
          position: "center",
          icon: "success",
          title: "Payment successful!",
          showConfirmButton: false,
          timer: 3000,
        });

        router.push("/paymentHistory");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#380e44] shadow-lg rounded-lg p-6">
     <div> <h2 className="text-2xl font-semibold text-gray-200 text-center">Payment Checkout</h2></div>
      <form onSubmit={handleSubmit} className="mt-4">
        <CardElement
          options={{
            style: {
              base: {
                iconColor: "#c4f0ff",
                color: "#fff",
                fontWeight: "500",
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "18px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": {
                  color: "#fce883",
                },
                "::placeholder": {
                  color: "#fff",
                },
              },
              invalid: {
                iconColor: "#FFC7EE",
                color: "#FFC7EE",
              },
            },
          }}
        />
        <button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Make Payment
        </button>
        {error && <p className="text-red-600 mt-4">{error}</p>}
        {transactionId && (
          <p className="text-green-600 mt-4">Your transaction ID: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
