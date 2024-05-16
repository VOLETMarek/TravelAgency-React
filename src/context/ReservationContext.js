import React, { createContext, useState, useContext } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservationList, setReservationList] = useState({
    flight: null,
    activity: null,
    hotel: null
  });

  return (
    <ReservationContext.Provider value={{ reservationList, setReservationList }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);

