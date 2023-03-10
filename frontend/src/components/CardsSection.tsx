import { useState } from "react";

import DogCard from "./DogCard";
import { DogPropsType } from "../types/DogTypes";
import { useAllDogs } from "../../fetch-functions.js/dogs/useFetchDogs";
import FilterBar from "./FilterBar";

const CardsSection = () => {
  const [queryStr, setQueryStr] = useState("");
  const [dogs] = useAllDogs(queryStr);

  const breeds = dogs.map((dog) => dog.breed);
  const uniqueListOfBreeds = [...new Set(breeds)];

  const countries = dogs.map((dog) => dog.countryCode);
  const uniqueListOfCountries = [...new Set(countries)];

  function setQueryString(string: string) {
    setQueryStr(string);
  }

  return (
    <>
      <FilterBar
        breeds={uniqueListOfBreeds}
        countries={uniqueListOfCountries}
        setQuery={setQueryString}
      />
      <section className="card-section">
        <ul id="collection-container">
          {dogs.map((dog: DogPropsType) => {
            return <DogCard key={dog._id} {...dog} />;
          })}
        </ul>
      </section>
    </>
  );
};

export default CardsSection;
