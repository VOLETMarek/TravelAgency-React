import React, { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData";
import HotelCard from "./HotelCard";
import Calendar from "../Filters/Calendar";
import ResetFilter from "../Buttons/ResetFilter";
import { useFilter } from "../../context/FilterContext";

function HotelList() {
  const [hotelList, setHotelList] = useState([]);
  const [filterDates, setFilterDates] = useState([null, null]);
  const [filteredHotelList, setFilteredHotelList] = useState([]);
  const { isReset, setIsReset } = useFilter();

  // Réinitialiser les filtres lorsque isReset change
  useEffect(() => {
    setFilteredHotelList(hotelList);
    setFilterDates([null, null]);
  }, [isReset]);

  useEffect(() => {
    if (filterDates[0] && filterDates[1]) {
      const start = filterDates[0];
      const end = filterDates[1];
      // La méthode filter nous retourne un nouveau tableau qui satisafait la condiditon specifiée.
      const filtered = hotelList.filter((hotel) => {
        // On converti les dates retournées par l'API au meme format que les dates fournies par notre composant Calendar :
        const departureDate = new Date(hotel.start_date);
        const arrivalDate = new Date(hotel.end_date);
        // Pour chaque objet, si la date de départ fournie par l'api est superieur ou égale à la date saisie et que la date d'arrivée est inferieur à la date saisie, alors on retourne true. On aura Ainsi un nouveau tableau avec les vols filtrés
        return departureDate >= start && arrivalDate <= end;
      });
      setFilteredHotelList(filtered);
    } else {
      setFilteredHotelList(hotelList);
    }
  }, [filterDates, hotelList]);

  // Lors du montage du composant, on recupere les données
  useEffect(() => {
    const fetchHotels = async () => {
      const hotels = await fetchData("frontoffice/hotel-list");
      setHotelList(hotels);
    };

    fetchHotels();
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl py-12 font-bold">
        🏠 &nbsp;Hotel List &nbsp;🏠
      </h1>
      <div className="flex gap-2 items-center justify-center pb-9">
        <Calendar setFilterDates={setFilterDates} />
        <ResetFilter />
      </div>
      {filteredHotelList.length > 0 ? (
        <div className="flex flex-wrap gap-4 mx-4 justify-center mb-8">
          {filteredHotelList.map((hotel, index) => (
            <HotelCard hotel={hotel} />
          ))}
        </div>
      ) : (
        <p className="text-center">Aucun hotel trouvé</p>
      )}
    </div>
  );
}

export default HotelList;
