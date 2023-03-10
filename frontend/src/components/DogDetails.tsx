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
        <div>
          <h3>{dog.name}'s Profile</h3>
          <p>
            <span>Breed:</span> {dog.breed}
          </p>
          <p>
            <span>Gender:</span> {dog.gender}
          </p>
          <p>
            <span>Age:</span> {dog.age}
          </p>
          <p>
            <span>Weight:</span> {dog.weight_kg}
          </p>
          <p>
            <span>Height:</span> {dog.height_kg}
          </p>
          <p>
            <span>Country:</span> {dog.countryCode}
          </p>
          <p>
            <span>City:</span> {dog.city}
          </p>
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
