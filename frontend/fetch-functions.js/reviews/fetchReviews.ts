import { QueryFunction } from "@tanstack/react-query";
import { GetReviewsTypeApiRes } from "../../src/types/ReviewTypes";

export const getReviews: QueryFunction<
  GetReviewsTypeApiRes,
  ["reviews", string]
> = async ({ queryKey }) => {
  const id = queryKey[1];

  const jwt = localStorage.getItem("token");

  const apiResponse = await fetch(
    `${import.meta.env.VITE_ROOT_API_ENDPOINT}/dogs/${id}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  if (!apiResponse.ok) {
    throw new Error(`Error: Fetching reviews failed !`);
  }

  return apiResponse.json();
};
