import React from "react";
import { Link } from "react-router-dom";
import Rate from "../Rate/Rate";


const FlightCard = ({ flight }) => {
  return (
    <div className="w-1/2">
      <div className="max-w-full flex flex-col rounded overflow-hidden shadow-lg item">
        <div className="flex flex-row items-baseline flex-nowrap p-2">
          <svg
            viewBox="0 0 64 64"
            data-testid="tripDetails-bound-plane-icon"
            pointer-events="all"
            aria-hidden="true"
            className="mt-2 mr-1"
            role="presentation"
            style={{
              fill: "rgb(102, 102, 102)",
              height: "0.9rem",
              width: "0.9rem",
            }}
          >
            <path d="M43.389 38.269L29.222 61.34a1.152 1.152 0 01-1.064.615H20.99a1.219 1.219 0 01-1.007-.5 1.324 1.324 0 01-.2-1.149L26.2 38.27H11.7l-3.947 6.919a1.209 1.209 0 01-1.092.644H1.285a1.234 1.234 0 01-.895-.392l-.057-.056a1.427 1.427 0 01-.308-1.036L1.789 32 .025 19.656a1.182 1.182 0 01.281-1.009 1.356 1.356 0 01.951-.448l5.4-.027a1.227 1.227 0 01.9.391.85.85 0 01.2.252L11.7 25.73h14.5L19.792 3.7a1.324 1.324 0 01.2-1.149A1.219 1.219 0 0121 2.045h7.168a1.152 1.152 0 011.064.615l14.162 23.071h8.959a17.287 17.287 0 017.839 1.791Q63.777 29.315 64 32q-.224 2.685-3.807 4.478a17.282 17.282 0 01-7.84 1.793h-9.016z"></path>
          </svg>
          <h1 className="ml-2 uppercase font-bold text-green">departure</h1>
          <p className="ml-2 font-normal text-gray-500">
            {" "}
            {new Date(flight.departure_date).toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
        <div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap">
          <div className="flex flex-row place-items-center p-2">
            <img
              alt="airway logo"
              className="w-10 h-10 rounded-full"
              src={flight.logo}
              style={{
                opacity: "1",
                transformOrigin: "0% 50% 0px",
                transform: "none",
              }}
            />
            <div className="flex flex-col ml-2">
              <p className="text-xs text-gray-500 font-bold">
                {flight.airline}
              </p>
              <p className="text-xs text-gray-500">{flight.flight_number}</p>
            </div>
          </div>

          <div className="flex flex-col p-2">
            <p>
              {new Date(flight.departure_date).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
            <p className="text-gray-500 font-bold">
              {flight.departure_airport}
            </p>
          </div>
          <div className="flex flex-col flex-wrap p-2">
            <p>
              {new Date(flight.arrival_date).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
            <p className="text-gray-500 font-bold">{flight.arrival_airport}</p>
          </div>
        </div>
        <p className="text-end mx-8">{flight.duration.substring(0, 5)} hours</p>
        <div className="mt-4">
          <div className="flex mx-6 py-4 flex-row-reverse flex-wrap items-center justify-between">
          <Rate rate={flight.rate} />
            <div className="text-sm mx-2 flex flex-col">
              <p className="">Standard Ticket</p>
              <p className="font-bold">{flight.price}€</p>
              <p className="text-xs text-gray-500">Price per adult</p>
            </div>
            <Link to={`/flight/${flight.id}`} state={{ flight }}>
              {/*   */}
              <button className="font-medium w-32 h-11 rounded flex border-solid mx-2 justify-center place-items-center bg-green">
                <div>See More</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
