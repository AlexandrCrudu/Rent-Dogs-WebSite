import Select from "react-select";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";

function FilterBar({
  breeds,
  countries,
}: {
  breeds: string[];
  countries: string[];
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

  return (
    <div className="filter-wrapper">
      <div>
        <h3>Breeds:</h3>
        <Select
          options={breedOptions}
          isMulti
          isSearchable
          noOptionsMessage={() => "No breeds found!"}
        />
      </div>
      <div>
        <h3>Countries:</h3>
        <Select options={countryOptions} isMulti />
      </div>
      <div>
        <h3>Gender:</h3>
        <Select options={genderOptions} />
      </div>
      <div>
        <h3>Max Price:</h3>
        <input type="number" />
      </div>
    </div>
  );
}

export default FilterBar;
