import { useEffect, useState } from "react";
import getBookings from "../../fetch-functions.js/bookings/fetchBookings";
import { BookingType } from "../types/BookingTypes";
import UserContext from "../../src/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [bookings, setBookings] = useState([] as BookingType[]);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    const fetchBookings = async () => {
      const fetchedBookings = await getBookings(user?._id!);
      setBookings(fetchedBookings.data.bookings);
    };

    fetchBookings();
  }, []);

  console.log(bookings);

  return (
    <section className="order-section">
      <h3 className="orders-title">My orders</h3>
      <div>
        {bookings.map((booking) => {
          return (
            <div className="order-textarea-wrapper">
              <div className="order-wrapper" key={booking._id}>
                <img
                  className="order-dog-avatar"
                  src={`../img/dogs/${booking.dog.name}-hero.jpg`}
                  alt="dog avatar"
                />
                <div className="order-details">
                  <p>
                    <span>name</span> - {booking.dog.name}
                  </p>
                  <p>
                    <span>date</span> -{" "}
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span>Nr. of Days - </span>{" "}
                    {booking.price / booking.dog.pricePerDay}
                  </p>
                  <p>
                    <span>Amount</span> - {booking.price}$
                  </p>
                </div>
                <Link
                  to={`/${booking.dog.id}/write-review`}
                  className="primary-button place-review"
                >
                  WRITE A REVIEW
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyOrders;
