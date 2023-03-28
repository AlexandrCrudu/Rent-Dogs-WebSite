import { useParams } from "react-router-dom";
import { useGetReviews } from "../../fetch-functions.js/reviews/useFetchReviews";
import ReviewCard from "./ReviewCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const Reviews = () => {
  const { dogId } = useParams();
  const [reviews, status] = useGetReviews(dogId ?? "");

  if (status === "loading") return <Loader />;
  if (status === "error") return <ErrorMessage />;

  return (
    <div className="reviews-outer-wrapper">
      <div className="reviews-wrapper">
        {reviews.map((review) => {
          return <ReviewCard key={review.id} review={review} />;
        })}
      </div>
    </div>
  );
};

export default Reviews;
