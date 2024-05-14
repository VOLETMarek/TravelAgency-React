import React, { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData";
import FlightCard from "./FlightCard";

function FlightList() {
  const [flightList, setFlightList] = useState([]);
  // Lors du montage du composant, on recupere les données
  useEffect(() => {
    const fetchFlights = async () => {
      const flights = await fetchData("frontoffice/flight-list");
      setFlightList(flights);
    };

    fetchFlights();
  }, []);
  return (
    <div>
      <h1 className="text-center text-3xl mb-12 font-bold">
        ✈️ - Flight List - ✈️
      </h1>
      <div className="flex flex-wrap gap-4 mx-4 justify-center">
        {flightList.map((flight, index) => (
          <FlightCard flight={flight} />
        ))}
      </div>
    </div>
  );
}

export default FlightList;
