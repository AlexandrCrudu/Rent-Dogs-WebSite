export type DogPropsType = {
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
  __v: 0;
};

export type AllDogsAPIResType = {
  status: string;
  data: {
    dogs: DogPropsType[];
  };
};

export type OneDogApiResType = {
  status: string;
  data: {
    dog: DogPropsType;
  };
};
