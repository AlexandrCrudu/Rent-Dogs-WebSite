import Select, { MultiValue, SingleValue } from "react-select";
import "react-dropdown/style.css";
import { useState } from "react";

type OptionType = {
  value: string;
  label: string;
};

function FilterBar({
  breeds,
  countries,
  setQuery,
}: {
  breeds: string[];
  countries: string[];
  setQuery: (string: string) => void;
}) {
  const [selectedBreed, setSelectedBreed] = useState([] as string[]);
  const [selectedCountry, setSelectedCountry] = useState([] as string[]);
  const [selectedGender, setSelectedGender] = useState(
    "all" as "male" | "female" | "all"
  );
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(
    "all" as string[] | string
  );

  const breedOptions = breeds.map((breed) => ({
    value: `${breed}`,
    label: `${breed}`,
  }));

  const countryOptions = countries.map((country) => ({
    value: `${country}`,
    label: `${country}`,
  }));

  const genderOptions = [
    {
      value: "all",
      label: "all",
    },
    {
      value: "male",
      label: "male",
    },
    {
      value: "female",
      label: "female",
    },
  ];

  const priceOptions = [
    {
      value: "all",
      label: "all",
    },
    {
      value: "0-50",
      label: "0-50",
    },
    {
      value: "50-200",
      label: "50-200",
    },
    {
      value: "200-400",
      label: "200-400",
    },
    {
      value: "400+",
      label: "400+",
    },
  ];

  const handleBreedChange = (selectedOption: MultiValue<OptionType>) => {
    setSelectedBreed(selectedOption.map((value) => value.value));
  };

  const handleGenderChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedGender(selectedOption?.value as "female" | "male");
  };

  const handleCountryChange = (selectedOption: MultiValue<OptionType>) => {
    setSelectedCountry(selectedOption.map((value) => value.value));
  };

  const handlePriceChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption?.value !== "all") {
      const values = selectedOption?.value.includes("+")
        ? selectedOption.value
        : selectedOption?.value.split("-");
      setSelectedMaxPrice(values || "all");
    } else setSelectedMaxPrice("all");
  };

  const handleApplyFilters = () => {
    let queryString = "";

    if (selectedBreed.length) {
      const breeds = selectedBreed.join("&breed=");
      queryString = `breed=${breeds}`;
    }

    if (selectedCountry.length) {
      const countries = selectedCountry.join("&countryCode=");
      queryString += `${queryString ? "&" : ""}countryCode=${countries}`;
    }
    if (selectedGender !== "all") {
      queryString += `${queryString ? "&" : ""}gender=${selectedGender}`;
    }
    if (selectedMaxPrice.length !== 0 && selectedMaxPrice !== "all") {
      queryString += `&pricePerDay`;
      !Array.isArray(selectedMaxPrice)
        ? (queryString += `[gte]=${selectedMaxPrice.split("+")[0]}`)
        : (queryString += `[gte]=${selectedMaxPrice[0]}&pricePerDay[lte]=${selectedMaxPrice[1]}`);
    }
    setQuery(queryString);
  };

  return (
    <div className="filter-wrapper">
      <div>
        <h3>Breeds:</h3>
        <Select
          options={breedOptions}
          onChange={handleBreedChange}
          isMulti
          isSearchable
          noOptionsMessage={() => "No breeds found!"}
        />
      </div>
      <div>
        <h3>Countries:</h3>
        <Select
          options={countryOptions}
          isMulti
          onChange={handleCountryChange}
          noOptionsMessage={() => "No countries found!"}
        />
      </div>
      <div>
        <h3>Gender:</h3>
        <Select
          options={genderOptions}
          onChange={handleGenderChange}
          defaultValue={{ value: "all", label: "all" }}
        />
      </div>
      <div>
        <h3>Price Range:</h3>
        <Select
          options={priceOptions}
          onChange={handlePriceChange}
          defaultValue={{ value: "all", label: "all" }}
        />
      </div>
      <div className="applyFilters-wrapper">
        <button onClick={handleApplyFilters}>Apply Filters</button>
      </div>
    </div>
  );
}

export default FilterBar;
