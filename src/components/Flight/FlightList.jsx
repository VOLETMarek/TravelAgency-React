import React, { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData";
import FlightCard from "./FlightCard";
import Calendar from "../Filters/Calendar";
import ResetFilter from "../Buttons/ResetFilter";
import { useFilter } from "../../context/FilterContext";
import Search from "../Filters/Search";
import Dropdown from "../Filters/Dropdown";

function FlightList() {
  const [flightList, setFlightList] = useState([]);
  // Création d'un state pour receptionner la valeur de la liste des vols filtrés
  const [filteredFlightList, setFilteredFlightList] = useState([]);
  // Ici on receptionne la valeur de l'input search
  const [searchValue, setSearchValue] = useState("");
  // Ici on réceptionne la valeur du filtrage par prix
  const [priceValue, setPriceValue] = useState("");
  // Ici on receptionne les dates transmises par notre composant calendar
  const [filterDates, setFilterDates] = useState([null, null]);
  const { isReset, setIsReset } = useFilter();

  // Réinitialiser les filtres lorsque isReset change
  useEffect(() => {
    setFilteredFlightList(flightList);
    setFilterDates([null, null]);
  }, [isReset]);

  // Filtrer par date
  useEffect(() => {
    if (filterDates[0] && filterDates[1]) {
      const start = filterDates[0];
      const end = filterDates[1];
      // La méthode filter nous retourne un nouveau tableau qui satisafait la condiditon specifiée.
      const filtered = filteredFlightList.filter((flight) => {
        // On converti les dates retournées par l'API au meme format que les dates fournies par notre composant Calendar :
        const departureDate = new Date(flight.departure_date);
        const arrivalDate = new Date(flight.arrival_date);
        // Pour chaque objet, si la date de départ fournie par l'api est superieur ou égale à la date saisie et que la date d'arrivée est inferieur à la date saisie, alors on retourne true. On aura Ainsi un nouveau tableau avec les vols filtrés
        return departureDate >= start && arrivalDate <= end;
      });
      setFilteredFlightList(filtered);
    } else {
      setFilteredFlightList(flightList);
    }
  }, [filterDates]);

  // Filtrer la liste des vols par valeur de recherche
  useEffect(() => {
    if (searchValue) {
      setFilteredFlightList(
        filteredFlightList.filter((flight) =>
          flight.arrival_airport
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredFlightList(flightList);
    }
  }, [searchValue]);

  // Filtrer par prix
  useEffect(() => {
    if (priceValue === "asc") {
      const sorted = [...filteredFlightList].sort((a, b) => a.price - b.price);
      setFilteredFlightList(sorted);
    } else if (priceValue === "desc") {
      const sorted = [...filteredFlightList].sort((a, b) => b.price - a.price);
      setFilteredFlightList(sorted);
    } else {
      setFilteredFlightList(flightList);
    }
  }, [priceValue]);

  // Lors du montage du composant, on recupere les données
  useEffect(() => {
    const fetchFlights = async () => {
      const flights = await fetchData("frontoffice/flight-list");
      setFlightList(flights);
      setFilteredFlightList(flights);
    };

    fetchFlights();
  }, []);

  return (
    <div className="pb-8">
      <h1 className="text-center text-3xl py-12 font-bold">
        ✈️ &nbsp; Flight List &nbsp; ✈️
      </h1>
      <div className="flex gap-2 items-center justify-center pb-9">
        <Search
          setSearchValue={setSearchValue}
          placeholder={"Search any destination"}
        />
        <Dropdown setPriceValue={setPriceValue} />
        <Calendar setFilterDates={setFilterDates} />
        <ResetFilter />
      </div>
      {filteredFlightList.length > 0 ? (
        <div className="flex flex-wrap gap-8 mx-4 justify-center">
          {filteredFlightList.map((flight, index) => (
            <FlightCard flight={flight} />
          ))}
        </div>
      ) : (
        <p className="text-center">Aucun vol trouvé</p>
      )}
    </div>
  );
}

export default FlightList;
