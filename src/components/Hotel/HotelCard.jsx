import React from "react";
import { Link } from "react-router-dom";
import Rate from "../Rate/Rate";

const HotelCard = ({ hotel }) => {
  return (
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow item">
      <img
        className="rounded-t-lg w-full h-64 object-cover"
        src={hotel.image}
        alt="hotel-pic"
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight">{hotel.name}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden line-clamp-3">
          {hotel.description}
        </p>
        <div className="flex justify-between items-center">
          <Link to={`/hotel/${hotel.id}`} state={{ hotel }}>
            <button className="font-medium w-32 h-11 rounded flex border-solid justify-center place-items-center bg-green">
              <div>See More</div>
            </button>
          </Link>
          <Rate rate={hotel.rate} />
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
