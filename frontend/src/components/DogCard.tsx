import { Link } from "react-router-dom";
import { DogPropsType } from "../types/DogTypes";

const DogCard = ({
  name,
  breed,
  countryCode,
  city,
  age,
  gender,
  pricePerDay,
  available,
  _id,
}: DogPropsType) => {
  return (
    <li className="card">
      <div className="card-img">
        <img
          src={`../img/dogs/${name}-hero.jpg`}
          alt="happy dog sitting on grass"
        />
      </div>
      <div className="card-body">
        <h3>{name}</h3>
        <div className="card-data">
          <img src="../img/bulldog-svgrepo-com.svg" alt="" />
          <span>{breed}</span>
        </div>
        <div className="card-data">
          <img src="../img/location-svgrepo-com.svg" alt="" />
          <span>
            {city}, {countryCode}
          </span>
        </div>
        <div className="card-data">
          <img src="../img/clock-svgrepo-com.svg" alt="" />
          <span>
            {age + " "}
            {age === 1 ? "year" : "years"} old
          </span>
        </div>
        <div className="card-data">
          <img src="../img/gender-svgrepo-com.svg" alt="" />
          <span>{gender}</span>
        </div>
      </div>
      <div className="card-footer">
        <p>
          <span className="card-footer-value">{pricePerDay}$</span>
          <span className="card-footer-text">per day</span>
        </p>
        <p className="card-dog-availability">
          {!available ? "not " : ""}available today
        </p>
        <Link className="primary-button" to={`dog-details/${_id}`}>
          Details
        </Link>
      </div>
    </li>
  );
};

export default DogCard;
