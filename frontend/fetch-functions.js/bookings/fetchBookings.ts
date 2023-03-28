import { GetBookingApiType } from "../../src/types/BookingTypes";

const getBookings = async (userId: string): Promise<GetBookingApiType> => {
  const jwt = localStorage.getItem("token");

  const res = await fetch(
    `${import.meta.env.VITE_ROOT_API_ENDPOINT}/users/${userId}/bookings`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.json();
};

export default getBookings;
