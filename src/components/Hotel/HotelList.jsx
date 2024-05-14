import React, { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData";
import HotelCard from "./HotelCard";

function HotelList() {
  const [hotelList, setHotelList] = useState([]);
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
      <div className="flex flex-wrap gap-4 mx-4 justify-center">
        {hotelList.map((hotel, index) => (
          <HotelCard hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default HotelList;
