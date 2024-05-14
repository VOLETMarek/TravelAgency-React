import React from "react";
import { Link } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  return (
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img class="rounded-t-lg" src={activity.image} alt="activity-pic" />
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {activity.name}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden line-clamp-3">
          {activity.description}
        </p>
        <Link to={`/activity/${activity.id}`} state={{ activity }}>
          <button className="font-medium w-32 h-11 rounded flex border-solid justify-center place-items-center bg-green">
            <div>See More</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
