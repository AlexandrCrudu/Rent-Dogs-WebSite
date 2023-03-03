import { DogPropsType } from "../types/DogTypes";

const DogCard = (props: DogPropsType) => {
  return (
    <li className="card">
      <div className="card-img">
        <img src="../img/dog-test.jpg" alt="happy dog sitting on grass" />
      </div>
      <div className="card-body">
        <h3>
          {props.name} alias {props.alias}
        </h3>
        <div className="card-data">
          <img src="../img/bulldog-svgrepo-com.svg" alt="" />
          <span>{props.breed}</span>
        </div>
        <div className="card-data">
          <img src="../img/location-svgrepo-com.svg" alt="" />
          <span>
            {props.city}, {props.countryCode}
          </span>
        </div>
        <div className="card-data">
          <img src="../img/clock-svgrepo-com.svg" alt="" />
          <span>
            {props.age + " "}
            {props.age === 1 ? "year" : "years"} old
          </span>
        </div>
        <div className="card-data">
          <img src="../img/gender-svgrepo-com.svg" alt="" />
          <span>{props.gender}</span>
        </div>
      </div>
      <div className="card-footer">
        <p>
          <span className="card-footer-value">{props.pricePerDay}$</span>
          <span className="card-footer-text">per day</span>
        </p>
        <p className="card-dog-availability">not available today</p>
        <a href="card-dog-btn">Details</a>
      </div>
    </li>
  );
};

export default DogCard;
