import { fetchAllDogs, fetchDog } from "./fetchDogs";
import { QueryStatus, useQuery } from "@tanstack/react-query";
import { DogPropsType } from "../../src/types/DogTypes";

export const useAllDogs = (queryStr: string) => {
  const results = useQuery(["dogList", queryStr], fetchAllDogs);
  return [results?.data?.data?.dogs ?? [], results.status] as [
    DogPropsType[],
    QueryStatus
  ];
};

export const useOneDog = (id: string) => {
  const results = useQuery(["dog", id], fetchDog);
  return [results?.data?.data?.dog ?? {}, results.status] as [
    DogPropsType,
    QueryStatus
  ];
};
