import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="text-center text-3xl py-12 font-bold">
        🏖 &nbsp; Welcome to Travel Agency &nbsp; 🏖
      </h1>
      <h2 className="text-center text-3xl py-3 font-semibold">
        Que recherchez vous ?
      </h2>
      <div className="flex justify-around py-12">
        <Link
          to="/flights"
          className="font-medium w-32 h-11 rounded flex border-solid justify-center place-items-center bg-green"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          Flights
        </Link>
        <Link
          to="/hotels"
          className="font-medium w-32 h-11 rounded flex border-solid justify-center place-items-center bg-green"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Hotels
        </Link>
        <Link
          to="/activities"
          className="font-medium w-32 h-11 rounded flex border-solid justify-center place-items-center bg-green"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          Activities
        </Link>
      </div>
      <img src="https://images.pexels.com/photos/2765869/pexels-photo-2765869.jpeg?auto=compress&cs=tinysrgb&w=600" className="pb-12 mx-auto block rounded-xl"/>
    </div>
  );
}

export default Home;
