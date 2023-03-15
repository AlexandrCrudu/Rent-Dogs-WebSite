import { ReviewType } from "../types/ReviewTypes";

// use a wrapper
const ReviewCard = ({ review }: { review: ReviewType }) => {
  console.log(review);
  return (
    <div className="review">
      <div className="review-author">
        <span>{review.user.email}</span>
      </div>
      <div className="review-text">
        <p>{review.review}</p>
      </div>
      <div className="rating-wrapper">
        <div className="review-rating">
          {[...Array(5)].map((_, index) => {
            return (
              <span key={index} className="rating-star">
                <img
                  src={`../img/star-${
                    index <= review.rating ? "true" : "false"
                  }.png`}
                  alt=""
                />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
