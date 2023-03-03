import { useQuery } from "@tanstack/react-query";
import DogCard from "./DogCard";
import { DogPropsType } from "../types/DogTypes";
import { useAllDogs } from "../../fetch-functions.js/dogs/useFetchDogs";
import FilterBar from "./FilterBar";

const CardsSection = () => {
  const [dogs] = useAllDogs();

  const breeds = dogs.map((dog) => dog.breed);
  const uniqueListOfBreeds = breeds.filter(
    (value, index) => breeds.indexOf(value) === index
  );

  const countries = dogs.map((dog) => dog.countryCode);
  const uniqueListOfCountries = countries.filter(
    (value, index) => countries.indexOf(value) === index
  );

  return (
    <section>
      <FilterBar
        breeds={uniqueListOfBreeds}
        countries={uniqueListOfCountries}
      />
      <ul id="collection-container">
        {dogs.map((dog: DogPropsType) => {
          return <DogCard key={dog._id} {...dog} />;
        })}
      </ul>
    </section>
  );
};

export default CardsSection;
