const PaymentConfirmation = () => {
  const jwt = localStorage.getItem("token");
  console.log(jwt);
  const transaction = new URLSearchParams(window.location.search).get(
    "transaction"
  );

  const user = new URLSearchParams(window.location.search).get("user");
  const dog = new URLSearchParams(window.location.search).get("dog");
  const price = new URLSearchParams(window.location.search).get("price");

  if (transaction === "true") {
    const createBooking = async () => {
      await fetch("http://localhost:3001/api/v1/bookings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          user,
          dog,
          price,
        }),
      });
    };

    createBooking();
  }

  return (
    <section className="confirmation-section">
      <div>
        <h2>
          {transaction === "true"
            ? "Payment successfully completed !"
            : "Payment failed !"}
        </h2>
        <p>
          {transaction === "true"
            ? "Congratulations on renting a furry friend from our dog rental website! We hope you have a wonderful time with your new companion."
            : "We're sorry, but it seems that the payment for your dog rental has been rejected. Please check your payment information and try again or contact our customer support for further assistance."}
        </p>
      </div>
    </section>
  );
};

export default PaymentConfirmation;
