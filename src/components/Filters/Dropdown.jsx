import { useState, useEffect } from "react";
import { useFilter } from "../../context/FilterContext";

const Dropdown = ({ setPriceValue }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("");
  const { isReset, setIsReset } = useFilter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = (value) => {
    setDropDownValue(value);
    setPriceValue(value);
    setIsDropdownOpen(false);
  };

  // Réinitialiser les filtres lorsque isReset change
  useEffect(() => {
    setIsDropdownOpen(false);
    setDropDownValue("");
    setPriceValue("");
  }, [isReset]);
  
  return (
    <div className="relative inline-block">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-black bg-green outline-none font-semibold rounded text-sm px-5 py-3 text-center inline-flex items-center"
        type="button"
      >
        Price
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdown"
          className="absolute left-0 mt-2 z-10 divide-y divide-gray-100 rounded-lg shadow w-44 bg-green"
        >
          <ul
            className="py-2 text-sm cursor-pointer"
            aria-labelledby="dropdownDefaultButton"
          >
            <li
              className="px-4 py-2 text-black font-medium"
              onClick={() => handleClick("asc")}
            >
              Ascending
            </li>
            <li
              className="px-4 py-2 text-black font-medium"
              onClick={() => handleClick("desc")}
            >
              Descending
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
