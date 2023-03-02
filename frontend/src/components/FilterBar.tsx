import { useEffect } from "react";

const FilterBar = () => {
  useEffect(() => {
    const handleDocumentClickListener = (e: MouseEvent) => {
      // check if the button was clicked
      const isDropDownButton = (e.target as HTMLElement).matches(
        "[data-dropdown-button]"
      );

      // check if button was not clicked but the whole div was clicked, then do nothing
      if (
        !isDropDownButton &&
        (e.target as HTMLElement).closest("[data-dropdown]") != null
      )
        return;

      // if button was clicked, assign the parent div to this variable otherwise assign null
      const dropdownDiv = isDropDownButton
        ? ((e.target as HTMLElement).closest("[data-dropdown]") as HTMLElement)
        : null;

      if (dropdownDiv) {
        (e.target as HTMLElement)
          .closest("[data-dropdown]")
          ?.classList.toggle("active");
      } else {
        document
          .querySelector("[data-dropdown].active")
          ?.classList.remove("active");
      }
    };

    document.addEventListener("click", handleDocumentClickListener);

    return () => {
      document.removeEventListener("click", handleDocumentClickListener);
    };
  }, []);

  return (
    <div className="filter-wrapper">
      <div className="dropdown" data-dropdown>
        <button className="link" data-dropdown-button>
          Filter
        </button>
        <div className="dropdown-menu filter-grid">
          <div className="drop-down-section">
            <div className="dropdown-heading">Breeds</div>
            <div className="dropdown-breed-list">
              <label className="label-checkbox" htmlFor="">
                Breed1
                <input type="checkbox" className="breed-checkbox" />
              </label>
              <label className="label-checkbox" htmlFor="">
                Breed1
                <input type="checkbox" className="breed-checkbox" />
              </label>
              <label className="label-checkbox" htmlFor="">
                Breed1
                <input type="checkbox" className="breed-checkbox" />
              </label>
              <label className="label-checkbox" htmlFor="">
                Breed1
                <input type="checkbox" className="breed-checkbox" />
              </label>
              <label className="label-checkbox" htmlFor="">
                Breed1
                <input type="checkbox" className="breed-checkbox" />
              </label>
              <label className="label-checkbox" htmlFor="">
                Breed1
                <input type="checkbox" className="breed-checkbox" />
              </label>
              <label className="label-checkbox" htmlFor="">
                Breed1
                <input type="checkbox" className="breed-checkbox" />
              </label>
            </div>
          </div>
          <div className="drop-down-section">
            <div className="dropdown-heading">Countries</div>
            <select name="" id="">
              <option value="">Country 1</option>
              <option value="">Country 2</option>
              <option value="">Country 3</option>
            </select>
          </div>
          <div className="drop-down-section">
            <div className="dropdown-heading">Gender</div>
            <select name="" id="">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="drop-down-section">
            <div className="age-minmax-container">
              <span className="min-age">
                Min Age: <input type="number" />
              </span>
              <span>
                Max Age: <input type="number" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
