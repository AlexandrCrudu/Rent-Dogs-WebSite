import { useState, useEffect } from "react";

import DogCard from "./DogCard";
import { DogPropsType } from "../types/DogTypes";
import { useAllDogs } from "../../fetch-functions.js/dogs/useFetchDogs";
import Loader from "./Loader";

import FilterBar from "./FilterBar";

const CardsSection = () => {
  const [queryStr, setQueryStr] = useState("");
  const [dogs, status] = useAllDogs(queryStr);
  const [allDogs, setAllDogs] = useState<DogPropsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  // const [value, setValue] = useState(0);

  useEffect(() => {
    status === "loading" ? setLoading(true) : setLoading(false);
  }, [status]);

  useEffect(() => {
    if (!allDogs.length) setAllDogs(dogs);

    dogs.length ? setNoResults(false) : setNoResults(true);
  }, [dogs]);

  const breeds = allDogs.map((dog) => dog.breed);
  const uniqueListOfBreeds = [...new Set(breeds)];

  const countries = allDogs.map((dog) => dog.countryCode);
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
      {loading ? <Loader /> : null}
      {noResults && !loading ? (
        <h2 className="no-results">No results found !</h2>
      ) : null}
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
