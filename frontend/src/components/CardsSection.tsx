import { useQuery } from "@tanstack/react-query";
import DogCard from "./DogCard";
import DogType from "../types/DogType";
import { fetchAllDogs } from "../../fetch-functions.js/fetchDogs";
import FilterBar from "./FilterBar";

const CardsSection = () => {
  const dogsResults = useQuery(["dogList"], fetchAllDogs);

  if (dogsResults.isError) {
    return (
      <div>
        <h2>Error: fetching dogs failed</h2>
      </div>
    );
  }

  if (dogsResults.isLoading) {
    return (
      <div className="Loading-pane">
        <h2 className="loader">Loading ... </h2>
      </div>
    );
  }

  const dogs = dogsResults.data.data.dogs;

  return (
    <section>
      <FilterBar />
      <ul id="collection-container">
        {dogs.map((dog: DogType) => {
          return <DogCard key={dog._id} {...dog} />;
        })}
      </ul>
    </section>
  );
};

export default CardsSection;
