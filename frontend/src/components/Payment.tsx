import { useState, useEffect, ChangeEvent } from "react";
import { DogPropsType } from "../types/DogTypes";
import { loadStripe } from "@stripe/stripe-js";
import JWTContext from "../JWTContext";
import { useContext } from "react";

const stripePromise = loadStripe(
  "pk_test_51MlGwQEbCwvIHv2DRAZuYHQAjlZJK37ZB2U7MHfUBZvI3HqwrUd4GHSfbSP72ZSqGZLYHpIqQCGGYHX10yJ9ZOWf00YZRyiu1H"
);

export const ProductDisplay = () => {
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [jwt, setJwt] = useContext(JWTContext);
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNumberOfDays(Number(event.target.value));
  };

  const handleCheckoutSubmit = async () => {
    console.log(jwt);
    try {
      const stripe = await stripePromise;
      const res = await fetch(
        `http://localhost:3001/api/v1/bookings/create-checkout-session/640ca0b19cdade9ec09af4fd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ quantity: numberOfDays }),
        }
      );

      const jsonRes = await res.json();
      const session = jsonRes.session;
      console.log(jsonRes);
      await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <div className="checkout-product">
        {/* <img src={`${dog.name}-hero.jpg`} alt="Image of Dog" /> */}
        <div className="description">
          <h3>Checkout</h3>
          <input type="number" defaultValue={1} onChange={handleInput} />
        </div>
      </div>
      <button onClick={handleCheckoutSubmit}>Checkout</button>
    </section>
  );
};

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
);

// export default function Payment() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

//   return message ? <Message message={message} /> : <ProductDisplay  />;
// }
