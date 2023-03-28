import { QueryFunction } from "@tanstack/react-query";
import { AllDogsAPIResType, OneDogApiResType } from "../../src/types/DogTypes";

export const fetchDog: QueryFunction<
  OneDogApiResType,
  ["dog", string]
> = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiResponse = await fetch(
    `${import.meta.env.VITE_ROOT_API_ENDPOINT}/dogs/${id}`
  );

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
    `${import.meta.env.VITE_ROOT_API_ENDPOINT}/dogs?${queryStr}`
  );

  if (!apiResponse.ok) {
    throw new Error(`fetch not ok`);
  }

  return apiResponse.json();
};
