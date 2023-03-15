import { Link, useParams } from "react-router-dom";
import { useOneDog } from "../../fetch-functions.js/dogs/useFetchDogs";
import { useContext } from "react";

import JWTContext from "../JWTContext";
import ReviewCard from "./ReviewCard";
import Map from "./Map";
import { DogPropsType } from "../types/DogTypes";

const DogDetails = ({
  setDog,
}: {
  setDog: (selectedDog: DogPropsType) => void;
}) => {
  const { id } = useParams();
  const [dog, status] = useOneDog(id as string);
  const [jwt, setJwt] = useContext(JWTContext);

  if (status === "loading") {
    return <div>Loading ... </div>;
  }

  setDog(dog);
  // we'll render the first three reviews only
  const reviews = dog.reviews.slice(0, 3);

  return (
    <article>
      <section className="details-section details-header">
        <div className="details-title">
          <h1>
            Meet {dog.name}, {dog.alias}
          </h1>
        </div>
      </section>
      <section className="details-pictures">
        <div className="details-img-container">
          <img src={`../img/dogs/${dog.name}-1.jpg`} alt="" />
        </div>
        <div className="details-img-container">
          <img src={`../img/dogs/${dog.name}-2.jpg`} alt="" />
        </div>
      </section>
      <section className="details-section details-information">
        <h3 className="details-title-profile">Profile</h3>
        <div className="details-information-wrapper">
          <div className="details-section-div">
            <div className="details-profile">
              <hr />
              <div className="details-bio">
                <div>
                  <span>Breed - </span> {dog.breed}
                </div>
                <div>
                  <span>Gender - </span> {dog.gender}
                </div>
                <div>
                  <span>Age - </span> {dog.age} {dog.age > 1 ? "years" : "year"}{" "}
                  old
                </div>
                <div>
                  <span>Weight - </span> {dog.weight_kg} kg
                </div>
                <div>
                  <span>Height - </span> {dog.height_cm} cm
                </div>
                <div>
                  <span>City - </span> {dog.city}
                </div>
                {/* <div>
                  <span>Country - </span> {dog.countryCode}
                </div> */}
              </div>
              <hr />
            </div>

            <div className="details-summary">
              <p>{dog.description}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="details-section details-map">
        <h3>Location</h3>
        <div>
          <Map
            lat={dog.location.coordinates[1]}
            lng={dog.location.coordinates[0]}
          />
        </div>
      </section>
      <section className="details-section details-reviews">
        <h3 className="details-title-profile">Reviews</h3>
        <div className="details-link-wrapper">
          <Link className="all-reviews-link" to={`/${dog._id}/reviews`}>
            {" "}
            See more{" "}
          </Link>
        </div>
        <div className="reviews-wrapper">
          {reviews.map((review) => {
            return <ReviewCard key={review.id} review={review} />;
          })}
        </div>
      </section>
      <section className="details-section details-advert-section">
        <div className="advert">
          <div className="call-to-action">
            <h4>what are you waiting for?</h4>
            <p>
              Rent a furry friend today and experience the unconditional love of
              a dog! Woof woof!
            </p>
          </div>
          <div className="button-advert">
            {jwt ? (
              <Link className="primary-button" to={`/pre-checkout/${dog._id}`}>
                Go To Checkout
              </Link>
            ) : (
              <Link className="primary-button" to="/login">
                Log in to rent {`${dog.name}`}
              </Link>
            )}
          </div>
        </div>
      </section>
    </article>
  );
};

export default DogDetails;
