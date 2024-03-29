import { useState } from "react";
import { DogPropsType } from "../types/DogTypes";
import { loadStripe } from "@stripe/stripe-js";
import ReactDropdown from "react-dropdown";
import { Option } from "react-dropdown";
import "react-dropdown/style.css";

import getMe from "../../fetch-functions.js/users/getMe";

const stripePromise = loadStripe(`${import.meta.env.VITE_PK_STRIPE}`);

const Checkout = ({ dog }: { dog: DogPropsType }) => {
  const [numberOfDays, setNumberOfDays] = useState(1);
  const jwt = localStorage.getItem("token");
  const handleInput = (option: Option) => {
    setNumberOfDays(Number(option.value));
  };

  const handleCheckoutSubmit = async () => {
    try {
      const stripe = await stripePromise;
      const userId = (await getMe()).data.user._id;

      const res = await fetch(
        `http://localhost:3000/api/v1/bookings/create-checkout-session/${dog._id}`,
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

export default Checkout;
