import Select, { MultiValue, SingleValue } from "react-select";
import "react-dropdown/style.css";
import { useState, useEffect } from "react";

type OptionType = {
  value: string;
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
      value: "not selected",
      label: "not selected",
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

  const sortPriceOptions = [
    {
      value: "not selected",
      label: "not selected",
    },
    {
      value: "low-high",
      label: "low-high",
    },
    {
      value: "high-low",
      label: "high-low",
    },
  ];

  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    setQuery(queryString);
  }, [queryString]);

  const handleBreedChange = (selectedOption: MultiValue<OptionType>) => {
    const selectedBreeds = selectedOption.map((option) => option.value);

    let newQueryString = queryString;

    breeds.forEach((breedName) => {
      const regex = new RegExp(`&breed=${breedName}`, "g");
      newQueryString = newQueryString.replaceAll(regex, "");
    });

    if (selectedOption.length) {
      const breedsString = `&breed=${selectedBreeds.join("&breed=")}`;
      setQueryString(`${newQueryString}${breedsString}`);
    } else {
      setQueryString(`${newQueryString}`);
    }
  };

  const handleGenderChange = (selectedOption: SingleValue<OptionType>) => {
    let newQueryString = queryString;
    const regex = new RegExp(`&gender=male|&gender=female`, "g");
    newQueryString = newQueryString.replaceAll(regex, "");

    if (selectedOption && selectedOption.value !== "not selected")
      setQueryString(`${newQueryString}&gender=${selectedOption.value}`);
    else if (selectedOption && selectedOption.value === "not selected") {
      setQueryString(newQueryString);
    }
  };

  const handleSortPriceChange = (selectedOption: SingleValue<OptionType>) => {
    let newQueryString = queryString;
    const regex = new RegExp(`&sort=price|&sort=-price`, "g");
    newQueryString = newQueryString.replaceAll(regex, "");

    if (selectedOption && selectedOption.value !== "not selected") {
      setQueryString(
        `${newQueryString}&sort=${
          selectedOption.value === "low-high" ? "pricePerDay" : "-pricePerDay"
        }`
      );
    } else if (selectedOption && selectedOption.value === "not selected") {
      setQueryString(newQueryString);
    }
  };

  const handleCountryChange = (selectedOption: MultiValue<OptionType>) => {
    const selectedCountries = selectedOption.map((option) => option.value);

    let newQueryString = queryString;

    countries.forEach((country) => {
      const regex = new RegExp(`&countryCode=${country}`, "g");
      newQueryString = newQueryString.replaceAll(regex, "");
    });

    if (selectedOption.length) {
      const countriesString = `&countryCode=${selectedCountries.join(
        "&countryCode="
      )}`;
      setQueryString(`${newQueryString}${countriesString}`);
    } else {
      setQueryString(`${newQueryString}`);
    }
  };

  return (
    <div className="filter-wrapper">
      <div>
        <h3>Breeds</h3>
        <Select
          options={breedOptions}
          onChange={handleBreedChange}
          isMulti
          isSearchable
          noOptionsMessage={() => "No breeds found!"}
        />
      </div>
      <div>
        <h3>Countries</h3>
        <Select
          options={countryOptions}
          isMulti
          onChange={handleCountryChange}
          noOptionsMessage={() => "No countries found!"}
        />
      </div>
      <div>
        <h3>Gender</h3>
        <Select
          options={genderOptions}
          onChange={handleGenderChange}
          defaultValue={{ value: "not selected", label: "not selected" }}
        />
      </div>
      <div>
        <h3>Price</h3>
        <Select
          options={sortPriceOptions}
          onChange={handleSortPriceChange}
          defaultValue={{ value: "not selected", label: "not selected" }}
        />
      </div>
    </div>
  );
}

export default FilterBar;
