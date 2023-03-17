import { CreateReviewTypeApiRes } from "../../src/types/ReviewTypes";

const createReview = async (
  dogId: string,
  rating: number,
  review: string
): Promise<CreateReviewTypeApiRes> => {
  const jwt = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:3000/api/v1/dogs/${dogId}/reviews`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        rating,
        review,
      }),
    }
  );
  return res.json();
};

export default createReview;
