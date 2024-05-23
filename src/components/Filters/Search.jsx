import { useState, useEffect } from "react";
import { useFilter } from "../../context/FilterContext";

const Search = ({ setSearchValue, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const { isReset, setIsReset } = useFilter();

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setSearchValue(inputValue);
  };

  // Réinitialiser les filtres lorsque isReset change
  useEffect(() => {
    setInputValue("");
  }, [isReset]);

  return (
    <div>
      <label
        for="default-search"
        class="mb-2 text-sm font-medium sr-only dark:text-white"
      >
        Search
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-green"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          value={inputValue}
          onChange={handleChange}
          type="search"
          id="default-search"
          class="block bg-beige w-full p-5 ps-10 text-sm text-gray-900 rounded border-2 border-green outline-none h-2"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};

export default Search;
