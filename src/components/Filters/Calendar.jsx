import React from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "./Calendar.css";

const Calendar = ({ setFilterDates }) => {

  const handleChange = (dates) => {
    // Si deux dates on étés saisies, on créer un nouveau tableau qui contiendra à l'index 0 la date de départ et à l'index 1 la date d'arrivée. toDate() est une methode fourni par react-multi-date-pircker. Elle converti un objet DataObject (un objet retourné par le calendrier lors du click sur une date) en un objet Date natif de JS. On retourne ainsi ici un tableau (par exemple : [Wed May 01 2024 15:11:09 GMT+0200 (heure d’été d’Europe centrale), Wed May 08 2024 15:11:09 GMT+0200 (heure d’été d’Europe centrale)])
    if (dates.length === 2) {
      setFilterDates(dates.map((date) => date.toDate()));
    }
  };

  return (
    <div className="flex justify-center">
      <DatePicker
        placeholder="Choose Date"
        onChange={handleChange}
        range
        dateSeparator=" to "
        className="green bg-dark"
        inputClass="custom-input"
        plugins={[<TimePicker position="bottom" />]}
      />
    </div>
  );
};

export default Calendar;
