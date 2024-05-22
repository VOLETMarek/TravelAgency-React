import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {useReservation} from "../../context/ReservationContext"
import Success from "../Message/Success";
import ReviewList from "../Review/ReviewList";
import Rate from "../Rate/Rate";


const FlightDetails = () => {
  let location = useLocation();
  const { state } = location;
  const { isLogged, setIsLogged } = useAuth();
  const {reservationList, setReservationList} = useReservation();
  const handleAddToCart = () => {
    setReservationList({...reservationList, flight: state.flight})
  }
  return (
    <div>
      <section>
        <div class="flex flex-col justify-center items-center p-8">
          <h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">
            {state.flight.airline}
          </h1>

          <div class="mt-8 lg:-mx-6 lg:items-center image-container">
            <img
              class="object-cover w-full rounded-xl h-72 lg:h-96"
              src={state.flight.image}
              alt="flight-pic"
            />

            <div class="flex justify-between items-center pt-5">
              <div class="flex items-center py-3">
                <img
                  class="object-cover object-center w-10 h-10 rounded-full"
                  src={state.flight.logo}
                  alt="flight-logo"
                />

                <div class="mx-4">
                  <h1 class="text-sm">{state.flight.airline}</h1>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {state.flight.flight_number}
                  </p>
                </div>
              </div>
              <Rate rate={state.flight.rate} />
            </div>

            <div class="relative overflow-x-auto my-8">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase item dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Departure Airport
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Arrival Airport
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Departure Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Arrival Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Duration
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Remaining Seats
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="item dark:border-gray-700">
                    <td class="px-6 py-4">{state.flight.departure_airport}</td>
                    <td class="px-6 py-4">{state.flight.arrival_airport}</td>
                    <td class="px-6 py-4">
                      {new Date(state.flight.departure_date).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )}
                    </td>
                    <td class="px-6 py-4">
                      {new Date(state.flight.arrival_date).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )}
                    </td>
                    <td class="px-6 py-4">
                      {state.flight.duration.substring(0, 5)} hours
                    </td>
                    <td class="px-6 py-4">{state.flight.remaining_seats}</td>
                    <td class="px-6 py-4">{state.flight.price}€</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {!isLogged ? (
              <div class="w-40 h-11 rounded flex border-solid mx-2 justify-center place-items-center p-2 mx-auto bg-green">
                <Link
                  to="/signin"
                  className="font-medium w-32 h-11 rounded flex border-solid justify-center place-items-center bg-green"
                >
                  Log in to book
                </Link>
              </div>
            ) : isLogged && !reservationList.flight ? (
              <div class="w-40 h-11 rounded flex border-solid mx-2 justify-center place-items-center p-2 mx-auto bg-green">
                <button className="flex gap-4" onClick={handleAddToCart}>
                <svg
                  class="h-6 w-6 text-green-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                  Add to cart
                </button>
              </div>
            ) : (
              <Success message="Réservation d'un vol en cours" />
            )}
          </div>
        </div>
      </section>
      <section>
        <ReviewList serviceId={state.flight.id} service={"flight"} />
      </section>
    </div>
  );
};

export default FlightDetails;
