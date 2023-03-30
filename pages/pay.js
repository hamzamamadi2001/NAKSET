import React ,{useState}from "react";
import {loadStripe} from '@stripe/stripe-js/pure';
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux'
import { useRouter } from "next/router";
import CheckoutForm from "../components/CheckoutForm";
import {useSession} from 'next-auth/react'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_live_51ML3mmCZwBUcumd5gk94aPjfpcPpoa5irPaadUbVFRWO7XN0em5UDlRN1LcVoCtf3OKB5HU51L4JNyIciKryAvu000WdmsF0MQ");

export default function App() {
  const {data:session,status}= useSession()

  const {locale}=useRouter()
  const [clientSecret, setClientSecret] = React.useState("");
  const items = useSelector((state) => state.counter.items)
  const currency = useSelector((state) => state.counter.currency)
const [error, setError] = useState(null);

  React.useEffect(() => {
    var item=[]
    items.forEach(ele => {
      item.push({id:ele.id,quantity:ele.quantity});
    });
    if(item.length==0){
      setError("your cart is empty");
      return
    }
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: item,currency:currency,id:session.id}),
    })
      .then((res) => res.json())
      .then((data) =>{console.log("this is the response",data);if(data.error==1){setError("your cart is empty");
      return}else{ setError(null);setClientSecret(data.clientSecret)} });
  }, [items]);

  const appearance = {
    theme: 'night',
    
  };
  const options = {
    clientSecret,
    appearance,
    locale:locale
    
  };

  return (
    <div className="App">
      <p className="text-red-600 text-3xl text-center">{error}</p>
      {clientSecret && error==null && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}