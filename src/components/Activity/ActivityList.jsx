import React, { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData";
import ActivityCard from "./ActivityCard";
import Calendar from "../Filters/Calendar";
import ResetFilter from "../Buttons/ResetFilter";
import { useFilter } from "../../context/FilterContext";
import Search from "../Filters/Search";

function ActivityList() {
  const [activityList, setActivityList] = useState([]);
  const [filterDates, setFilterDates] = useState([null, null]);
  const [filteredActivityList, setFilteredActivityList] = useState([]);
  const { isReset, setIsReset } = useFilter();
  // ici on receptionne la valeur de l'input search
  const [searchValue, setSearchValue] = useState("");

  // Réinitialiser les filtres lorsque isReset change
  useEffect(() => {
    setFilteredActivityList(activityList);
    setFilterDates([null, null]);
  }, [isReset]);

  // Filtrage par date
  useEffect(() => {
    if (filterDates[0] && filterDates[1]) {
      const start = filterDates[0];
      const end = filterDates[1];
      // La méthode filter nous retourne un nouveau tableau qui satisafait la condiditon specifiée.
      const filtered = activityList.filter((activity) => {
        // On converti les dates retournées par l'API au meme format que les dates fournies par notre composant Calendar :
        const departureDate = new Date(activity.start_date);
        const arrivalDate = new Date(activity.end_date);
        // Pour chaque objet, si la date de départ fournie par l'api est superieur ou égale à la date saisie et que la date d'arrivée est inferieur à la date saisie, alors on retourne true. On aura Ainsi un nouveau tableau avec les vols filtrés
        return departureDate >= start && arrivalDate <= end;
      });
      setFilteredActivityList(filtered);
    } else {
      setFilteredActivityList(activityList);
    }
  }, [filterDates, activityList]);

  // Filtrer la liste des activités par valeur de recherche
  useEffect(() => {
    if (searchValue) {
      setFilteredActivityList(
        activityList.filter((activity) =>
          activity.name
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredActivityList(activityList);
    }
  }, [searchValue, activityList]);

  // Lors du montage du composant, on recupere les données
  useEffect(() => {
    const fetchActivities = async () => {
      const activities = await fetchData("frontoffice/activity-list");
      setActivityList(activities);
    };

    fetchActivities();
  }, []);
  return (
    <div className="pb-8">
      <h1 className="text-center text-3xl py-12 font-bold">
        🏄‍♀️ &nbsp; Activity List &nbsp;🏄‍♀️
      </h1>
      <div className="flex gap-2 items-center justify-center pb-9">
        <Search
          setSearchValue={setSearchValue}
          placeholder={"Search any activity name"}
        />
        <Calendar setFilterDates={setFilterDates} />
        <ResetFilter />
      </div>
      {filteredActivityList.length > 0 ? (
        <div className="flex flex-wrap gap-4 mx-4 justify-center">
          {filteredActivityList.map((activity, index) => (
            <ActivityCard activity={activity} />
          ))}
        </div>
      ) : (
        <p className="text-center">Aucune activité trouvée</p>
      )}
    </div>
  );
}

export default ActivityList;
