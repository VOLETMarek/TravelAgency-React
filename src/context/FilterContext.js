import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [isReset, setIsReset] = useState(false);


  return (
    <FilterContext.Provider
      value={{ isReset, setIsReset}}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
