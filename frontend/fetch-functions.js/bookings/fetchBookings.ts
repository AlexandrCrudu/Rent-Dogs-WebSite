import { GetBookingApiType } from "../../src/types/BookingTypes";

const getBookings = async (userId: string): Promise<GetBookingApiType> => {
  const jwt = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:3001/api/v1/users/${userId}/bookings`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.json();
};

export default getBookings;
