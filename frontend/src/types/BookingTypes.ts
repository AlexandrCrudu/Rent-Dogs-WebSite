export type GetBookingApiType = {
  status: "success";
  data: {
    bookings: BookingType[];
  };
};

export type BookingType = {
  _id: string;
  dog: {
    name: string;
    pricePerDay: number;
    id: string;
  };
  user: string;
  price: number;
  createdAt: string;
  paid: true | false;
};
