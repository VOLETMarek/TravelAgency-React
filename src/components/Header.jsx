import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/flights", text: "Flights" },
  { to: "/activities", text: "Activities" },
  { to: "/hotels", text: "Hotels" },
];

function Header() {
  const { isLogged, setIsLogged } = useAuth();
  const { userData, setUserData } = useAuth();

  return (
    <div className="Header">
      <header className="bg-green border-b border-gray-700">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center h-16 lg:h-20 justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <NavLink
                  to="/"
                  className="mx-10 text-sm font-medium transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70 font-semibold text-base"
                >
                  Home
                </NavLink>
              </div>
              <button
                type="button"
                className="inline-flex p-2 transition-all duration-200 rounded-md md:hidden focus:bg-gray-800 hover:bg-gray-800"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              <div className="hidden md:flex md:items-center md:space-x-10">
                {navLinks.map((link, index) => (
                  <NavLink
                    to={link.to}
                    className="text-sm font-medium transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70 font-semibold text-base"
                  >
                    {link.text}
                  </NavLink>
                ))}
              </div>
            </div>
            {/* Si l'utilisateur est un administrateur, on affiche le lien vers le backoffice  */}
            <div className="flex items-center justify-center">
              {userData.role === "Admin" && (
                <Link
                  to="http://localhost:5000/backoffice/"
                  className="text-sm font-medium transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70 font-semibold text-base"
                  target="_blank"
                >
                  Admin
                </Link>
              )}
              {/* Si l'utilisateur est connecté, on affiche le lien vers la page informations utilisateurs  */}
              {isLogged ? (
                <>
                  <NavLink
                    to="/cart"
                    className="ml-10 text-sm font-medium transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70 font-semibold text-base"
                  >
                    <svg
                      class="h-6 w-6 text-green-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <circle cx="9" cy="21" r="1" />{" "}
                      <circle cx="20" cy="21" r="1" />{" "}
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </NavLink>
                  <NavLink
                    to="/user"
                    className="ml-10 text-sm font-medium transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70 font-semibold text-base"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </NavLink>
                </>
              ) : (
                // Afficher le lien "Login" si l'utilisateur n'est pas connecté
                <NavLink
                  to="/signin"
                  className="mx-10 text-sm font-medium transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70 font-semibold text-base"
                >
                  Login
                </NavLink>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
