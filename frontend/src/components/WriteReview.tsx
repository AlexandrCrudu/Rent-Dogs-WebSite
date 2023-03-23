import createReview from "../../fetch-functions.js/reviews/createReview";
import { useRef, useState } from "react";
import ReactDropdown from "react-dropdown";
import { Option } from "react-dropdown";
import { useParams, useNavigate } from "react-router-dom";

export default function WriteReview() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { dogId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(1);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createReview(dogId!, rating, textareaRef.current?.value!);
    navigate("/review-confirmation");
  };

  return (
    <section className="write-review-section">
      <h3 className="write-review-header">WRITE YOUR REVIEW HERE</h3>
      <form onSubmit={handleSubmit}>
        <span>Choose Rating </span>
        <ReactDropdown
          className="rating-dropdown"
          options={["1", "2", "3", "4", "5"]}
          value={"1"}
          onChange={(option: Option) => setRating(Number(option.value))}
        />
        <textarea
          ref={textareaRef}
          cols={1}
          rows={5}
          maxLength={195}
          required={true}
        ></textarea>
        <button type="submit" className="submit-review-btn primary-button">
          Submit
        </button>
      </form>
    </section>
  );
}
