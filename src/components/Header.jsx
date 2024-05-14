import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { to: "/Flights", text: "Flights" },
  { to: "/Activities", text: "Activities" },
  { to: "/Hotels", text: "Hotels" },
  { to: "/Login", text: "Login" },
];

function Header() {
  return (
    <div className="Header">
      <header className="bg-green border-b border-gray-700">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <NavLink to="/" className="p-2 rounded font-semibold text-base">
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
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
