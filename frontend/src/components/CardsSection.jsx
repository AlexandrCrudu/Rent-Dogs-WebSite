import React from "react";
import { useQuery } from "@tanstack/react-query";
import DogCard from "./DogCard";
import { fetchAllDogs } from "../../fetch-functions.js/fetchDogs";

const CardsSection = () => {
  const dogsResults = useQuery(["dogList"], fetchAllDogs);

  if (dogsResults.isLoading) {
    return (
      <div className="Loading-pane">
        <h2 className="loader">Loading ... </h2>
      </div>
    );
  }

  const dogs = dogsResults.data.data.dogs;
  console.log(dogs);

  return (
    <section>
      <ul id="collection-container">
        {dogs.map((dog) => {
          return <DogCard {...dog} />;
        })}
      </ul>
    </section>
  );
};

export default CardsSection;
