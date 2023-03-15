import { useParams } from "react-router-dom";
import { useGetReviews } from "../../fetch-functions.js/reviews/useFetchReviews";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const { dogId } = useParams();
  const [reviews, status] = useGetReviews(dogId ?? "");

  if (status === "loading") {
    return <div>... loading</div>;
  }

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
