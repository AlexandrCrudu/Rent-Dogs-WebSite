import { QueryFunction } from "@tanstack/react-query";
import { GetReviewsTypeApiRes } from "../../src/types/ReviewTypes";

export const getReviews: QueryFunction<
  GetReviewsTypeApiRes,
  ["reviews", string]
> = async ({ queryKey }) => {
  const id = queryKey[1];

  const jwt = localStorage.getItem("token");
  console.log(jwt);

  const apiResponse = await fetch(
    `http://localhost:3001/api/v1/dogs/${id}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  if (!apiResponse.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return apiResponse.json();
};