import React, { useState } from "react";
import { useReservation } from "../../context/ReservationContext";
import { signWithToken } from "../../services/authService";
import Success from "../Message/Success";

function Cart() {
  const { reservationList, setReservationList } = useReservation();
  const [message, setMessage] = useState("");

  // On verifie si les prix sont null, si un d'entre eux l'est, on additionne 0
  const flightPrice = reservationList.flight ? reservationList.flight.price : 0;
  const hotelPrice = reservationList.hotel
    ? reservationList.hotel.price_per_night
    : 0;
  const activityPrice = reservationList.activity
    ? reservationList.activity.price
    : 0;

  const totalPrice = flightPrice + hotelPrice + activityPrice;

  // Gère la suppression d'une reservation
  const handleRemoveReservation = (name) => {
    if (name === "flight") {
      setReservationList({ ...reservationList, flight: null });
    } else if (name === "hotel") {
      setReservationList({ ...reservationList, hotel: null });
    } else if (name === "activity") {
      setReservationList({ ...reservationList, activity: null });
    }
  };

  const handleCheckout = async () => {
    // Coté serveur, si on ne renseigne aucune propriété pour hotel id par exemple, hotel_id aura pour valeur NULL en BDD. Donc si par exemple un utilisateur ne reserve pas d'hotel, on ne renseigne pas cette propriété.
    const apiObject = { total_price: totalPrice };

    if (reservationList.flight && reservationList.flight.id) {
      apiObject.flight_id = reservationList.flight.id;
    }

    if (reservationList.activity && reservationList.activity.id) {
      apiObject.activity_id = reservationList.activity.id;
    }

    if (reservationList.hotel && reservationList.hotel.id) {
      apiObject.hotel_id = reservationList.hotel.id;
    }

    // Envoyer les données via l'API
    const response = await signWithToken("frontoffice/reservation", apiObject);
    if (response.message === "Réservation créée avec succès.") {
      setMessage(response.message);
    }
  };

  return (
    <div className="Login">
      <section className="antialiased md:py-8">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h1 className="text-3xl font-semibold text-gray-900 text-center">
            🛒&nbsp; Shopping Cart&nbsp; 🛒
          </h1>
          {/* Si aucune reservation n'est faite, on affiche un message, sinon on affiche les reservations */}
          {!reservationList.flight &&
          !reservationList.hotel &&
          !reservationList.activity ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-center my-8 text-2xl font-semibold">
                No reservations
              </p>
              <img
                src="https://images.pexels.com/photos/3360711/pexels-photo-3360711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="no-reservation"
              />
            </div>
          ) : (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                {/* Carte Avion  */}
                {reservationList.flight && (
                  <div className="space-y-6 mb-2">
                    <h2 className="text-center text-xl font-bold">
                      {" "}
                      ✈️ Your Flight ✈️{" "}
                    </h2>
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20 dark:hidden"
                            src={reservationList.flight.image}
                            alt="flight-pic"
                          />
                          <img
                            className="hidden h-20 w-20 dark:block"
                            src={reservationList.flight.image}
                            alt="flight-pic"
                          />
                        </div>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              {reservationList.flight.price}€
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <ul className="text-base font-medium dark:text-white">
                            <li>{reservationList.flight.airline}</li>
                            <li>
                              Departure -{" "}
                              {reservationList.flight.departure_airport} at{" "}
                              {new Date(
                                reservationList.flight.departure_date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </li>
                            <li>
                              Arrival - {reservationList.flight.arrival_airport}{" "}
                              at{" "}
                              {new Date(
                                reservationList.flight.arrival_date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </li>
                          </ul>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleRemoveReservation("flight")}
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* carte activity */}
                {reservationList.activity && (
                  <div className="space-y-6 mb-2">
                    <h2 className="text-center text-xl pt-4 font-bold">
                      {" "}
                      🏄‍♀️ Your Activity 🏄‍♀️{" "}
                    </h2>
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20 dark:hidden"
                            src={reservationList.activity.image}
                            alt="activity-pic"
                          />
                          <img
                            className="hidden h-20 w-20 dark:block"
                            src={reservationList.activity.image}
                            alt="activity-pic"
                          />
                        </div>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              {reservationList.activity.price}€
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <ul className="text-base font-medium dark:text-white">
                            <li className="mb-2 font-bold">
                              {reservationList.activity.name}
                            </li>
                            <li>
                              <span>Activity starts at </span>
                              {new Date(
                                reservationList.activity.start_date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </li>
                            <li>
                              <span>Activity ends at </span>
                              {new Date(
                                reservationList.activity.end_date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </li>
                          </ul>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveReservation("activity")
                              }
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Carte hotel */}
                {reservationList.hotel && (
                  <div className="space-y-6 mb-2">
                    <h2 className="text-center text-xl pt-4 font-bold">
                      🏠 Your Hotel 🏠
                    </h2>
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20 dark:hidden"
                            src={reservationList.hotel.image}
                            alt="hotel-pic"
                          />
                          <img
                            className="hidden h-20 w-20 dark:block"
                            src={reservationList.hotel.image}
                            alt="hotel-pic"
                          />
                        </div>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              {reservationList.hotel.price_per_night}€
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <ul className="text-base font-medium dark:text-white">
                            <li className="mb-2 font-bold">
                              {reservationList.hotel.name}
                            </li>
                            <li>
                              <span>Hotel reservations starts at </span>
                              {new Date(
                                reservationList.hotel.start_date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </li>
                            <li>
                              <span>Hotel reservations ends at </span>
                              {new Date(
                                reservationList.hotel.end_date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </li>
                          </ul>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleRemoveReservation("hotel")}
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 lg:mt-12 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order summary
                  </p>

                  <div className="space-y-4">
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {totalPrice}€
                      </dd>
                    </dl>
                  </div>

                  <button
                    className="font-medium rounded flex border-solid bg-green p-2 mx-auto"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                  {message !== "" && (<Success message={message} />)}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Cart;
