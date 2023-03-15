import { getReviews } from "./fetchReviews";
import { QueryStatus, useQuery } from "@tanstack/react-query";
import { ReviewType } from "../../src/types/ReviewTypes";

export const useGetReviews = (dogId: string) => {
  const results = useQuery(["reviews", dogId], getReviews);
  return [results?.data?.data?.reviews ?? [], results.status] as [
    ReviewType[],
    QueryStatus
  ];
};
