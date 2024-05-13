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
      <header class="border-b border-gray-700">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav class="flex items-center justify-between h-16 lg:h-20">
            <div class="flex-shrink-0">
              <NavLink to="/" class="flex text-white">
                Home
              </NavLink>
            </div>
            <div class="hidden md:flex md:items-center md:space-x-10">
              {navLinks.map((link, index) => (
                <NavLink
                  to={link.to}
                  class="text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"
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
