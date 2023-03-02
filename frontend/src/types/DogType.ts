type DogProps = {
  _id: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  name: string;
  weight_kg: number;
  height_kg: number;
  alias: string;
  breed: string;
  city: string;
  countryCode: string;
  age: number;
  gender: "male" | "female";
  pricePerDay: number;
};

export default DogProps;
