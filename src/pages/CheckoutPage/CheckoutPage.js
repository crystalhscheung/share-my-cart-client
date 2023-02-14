import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./CheckoutPage.scss";

export default function CheckoutPage() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${url}/config`).then((res) => {
      const { publishableKey } = res.data;
      setStripePromise(loadStripe(publishableKey));
    });
  }, [url]);

  useEffect(() => {
    axios.post(`${url}/create-payment-intent`, {}).then((res) => {
      const { clientSecret } = res.data;
      console.log(clientSecret);
      setClientSecret(clientSecret);
    });
  }, [url]);

  return (
    <main className="checkout">
      <h2 className="checkout__title">Check out now</h2>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </main>
  );
}
