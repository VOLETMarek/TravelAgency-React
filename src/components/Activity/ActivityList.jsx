import React, { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData";
import ActivityCard from "./ActivityCard";

function ActivityList() {
  const [activityList, setActivityList] = useState([]);
  // Lors du montage du composant, on recupere les données
  useEffect(() => {
    const fetchActivities = async () => {
      const activities = await fetchData("frontoffice/activity-list");
      setActivityList(activities);
    };

    fetchActivities();
  }, []);
  return (
    <div>
      <h1 className="text-center text-3xl mb-12 font-bold">
      🏄‍♀️ - Activity List - 🏄‍♀️
      </h1>
      <div className="flex flex-wrap gap-4 mx-4 justify-center">
        {activityList.map((activity, index) => (
          <ActivityCard activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default ActivityList;
