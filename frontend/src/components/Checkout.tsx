import { useState } from "react";
import { DogPropsType } from "../types/DogTypes";
import { loadStripe } from "@stripe/stripe-js";
import JWTContext from "../JWTContext";
import { useContext } from "react";
import ReactDropdown from "react-dropdown";
import { Option } from "react-dropdown";
import "react-dropdown/style.css";
import getMe from "../../fetch-functions.js/users/getMe";

const stripePromise = loadStripe(
  "pk_test_51MlGwQEbCwvIHv2DRAZuYHQAjlZJK37ZB2U7MHfUBZvI3HqwrUd4GHSfbSP72ZSqGZLYHpIqQCGGYHX10yJ9ZOWf00YZRyiu1H"
);

const Checkout = ({ dog }: { dog: DogPropsType }) => {
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [jwt, setJwt] = useContext(JWTContext);
  const handleInput = (option: Option) => {
    setNumberOfDays(Number(option.value));
  };

  const handleCheckoutSubmit = async () => {
    try {
      const stripe = await stripePromise;
      const userId = (await getMe()).data.user._id;
      console.log(await getMe());

      const res = await fetch(
        `http://localhost:3001/api/v1/bookings/create-checkout-session/${dog._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,

            successUrlStripe: `http://localhost:5173/payment-confirmation?transaction=true&dog=${
              dog._id
            }&user=${userId}&price=${dog.pricePerDay * numberOfDays}`,

            failUrlStripe:
              "http://localhost:5173/payment-confirmation?transaction=false",
          },
          body: JSON.stringify({ quantity: numberOfDays }),
        }
      );

      const jsonRes = await res.json();
      const session = jsonRes.session;
      await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const options = ["1", "2", "3", "4", "5"];

  return (
    <section className="checkout-section">
      <div className="checkout-product">
        <h3>checkout</h3>
        <div className="checkout-card">
          <img
            className="checkout-img"
            src={`../img/dogs/${dog.name}-hero.jpg`}
            alt="Image of Dog"
          />
          <p>Nr of days:</p>
          <ReactDropdown
            className="checkout-dropdown"
            options={options}
            value={options[0]}
            onChange={handleInput}
          />
          <div className="checkout-btn-wrapper">
            <a className="primary-button" onClick={handleCheckoutSubmit}>
              Pay now
            </a>
          </div>
        </div>
      </div>
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

export default Checkout;
