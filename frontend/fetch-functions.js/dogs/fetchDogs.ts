import { QueryFunction } from "@tanstack/react-query";
import { AllDogsAPIResType, OneDogApiResType } from "../../src/types/DogTypes";

export const fetchDog: QueryFunction<
  OneDogApiResType,
  ["dog", string]
> = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiResponse = await fetch(`http://localhost:3000/api/v1/dogs/${id}`);

  if (!apiResponse.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return apiResponse.json();
};

export const fetchAllDogs: QueryFunction<
  AllDogsAPIResType,
  ["dogList", string]
> = async ({ queryKey }) => {
  const queryStr = queryKey[1];

  const apiResponse = await fetch(
    `http://localhost:3000/api/v1/dogs?${queryStr}`
  );

  if (!apiResponse.ok) {
    throw new Error(`fetch not ok`);
  }

  return apiResponse.json();
};
