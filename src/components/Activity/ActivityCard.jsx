import React from "react";
import { Link } from "react-router-dom";
import Rate from "../Rate/Rate";


const ActivityCard = ({ activity }) => {
  return (
    <div class="max-w-sm border border-gray-200 rounded-lg shadow item">
      <img className="rounded-t-lg w-full h-64 object-cover" src={activity.image} alt="hotel-pic" />
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {activity.name}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden line-clamp-3">
          {activity.description}
        </p>
        <div className="flex justify-between items-center">
          <Link to={`/activity/${activity.id}`} state={{ activity }}>
            <button className="font-medium w-32 h-11 rounded flex border-solid justify-center place-items-center bg-green">
              <div>See More</div>
            </button>
          </Link>
          <Rate rate={activity.rate} />
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
