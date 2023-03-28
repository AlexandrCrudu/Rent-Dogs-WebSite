import { CreateReviewTypeApiRes } from "../../src/types/ReviewTypes";

const createReview = async (
  dogId: string,
  rating: number,
  review: string
): Promise<CreateReviewTypeApiRes> => {
  const jwt = localStorage.getItem("token");

  const res = await fetch(
    `${import.meta.env.VITE_ROOT_API_ENDPOINT}/dogs/${dogId}/reviews`,
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
