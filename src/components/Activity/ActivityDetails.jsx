import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useReservation } from "../../context/ReservationContext";
import Success from "../Message/Success";
import ReviewList from "../Review/ReviewList";
import Rate from "../Rate/Rate";

const ActivityDetails = () => {
  let location = useLocation();
  const { state } = location;
  const { isLogged, setIsLogged } = useAuth();
  const { reservationList, setReservationList } = useReservation();

  const handleAddToCart = () => {
    setReservationList({ ...reservationList, activity: state.activity });
  };
  return (
    <div>
      <section>
        <div class="flex flex-col justify-center items-center p-8">
          <h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">
            {state.activity.name}
          </h1>

          <div class="mt-8 lg:-mx-6 lg:items-center image-container">
            <img
              class="object-cover w-full rounded-xl h-72 lg:h-96"
              src={state.activity.image}
              alt="activity-pic"
            />
            <Rate rate={state.activity.rate} />
            <div class="flex justify-center">
              <div class="flex items-center">
                <p className="">{state.activity.description}</p>
              </div>
            </div>

            <div class="relative overflow-x-auto my-8">
              <table class=" border-y w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase item dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Start Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      End Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Duration
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Location
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white item">
                    <td class="px-6 py-4">
                      {new Date(state.activity.start_date).toLocaleString(
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
                      {new Date(state.activity.end_date).toLocaleString(
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
                      {state.activity.duration.substring(0, 5)} hours
                    </td>
                    <td class="px-6 py-4">{state.activity.location}</td>
                    <td class="px-6 py-4">{state.activity.price}€</td>
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
            ) : isLogged && !reservationList.activity ? (
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
              <Success message="Réservation d'une activité en cours" />
            )}
          </div>
        </div>
      </section>
      <section>
        <ReviewList serviceId={state.activity.id} service={"activity"} />
      </section>
    </div>
  );
};

export default ActivityDetails;
