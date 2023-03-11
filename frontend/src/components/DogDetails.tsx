import { useParams } from "react-router-dom";
import { useOneDog } from "../../fetch-functions.js/dogs/useFetchDogs";

const DogDetails = () => {
  const { id } = useParams();
  const [dog] = useOneDog(id as string);
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
        <h3 className="details-title-profile">{dog.name}'s Profile</h3>
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
                <div>
                  <span>Country - </span> {dog.countryCode}
                </div>
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
        <div id="map"></div>
      </section>
      <section className="details-section details-reviews">
        <div className="reviews-wrapper">
          <div className="review"></div>
          <div className="review"></div>
          <div className="review"></div>
        </div>
      </section>
      <section className="details-section details-advert">
        <div className="advert"></div>
      </section>
    </article>
  );
};

export default DogDetails;
