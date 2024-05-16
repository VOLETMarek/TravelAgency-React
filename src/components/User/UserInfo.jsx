import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { sign } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { removeToken } from "../../services/tokenService";

import { Link } from "react-router-dom";

function UserInfo() {
  const [redirectHome, setRedirectHome] = useState(false);
  const { isLogged, setIsLogged } = useAuth();
  // State du contexte pour recuperer le username et faire un appel API
  const { userData, setUserData } = useAuth();
  // State qui nous sert à affciher les données
  const [userInfo, setUserInfo] = useState({
    lastname: "",
    firstname: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await sign("frontoffice/user", userData);
      setUserInfo({
        ...userInfo,
        lastname: response.lastname,
        firstname: response.firstname,
        username: response.username,
        email: response.email,
      });
    };
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    setIsLogged(false);
    removeToken();
    setUserData({
      ...userData,
      lastname: "",
      firstname: "",
      username: "",
      email: "",
      role: "",
    });
    // Enfin, on redirige l'utilisateur vers lap age d'accueil
    setRedirectHome(!redirectHome);
  };

  if (redirectHome) {
    return <Navigate to="/" />;
  }

  return (
    <div class="bg-white overflow-hidden shadow rounded-lg border md:h-[calc(100vh-129px)] flex flex-col gap-16">
      <div class="px-4 py-5 sm:px-6">
        <h1 class="mt-8 text-3xl font-semibold text-gray-800 capitalize lg:text-4xl text-center">
          👤&nbsp; User Informations&nbsp; 👤
        </h1>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 mx-16 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Lastname</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo.lastname}
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Firstname</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo.firstname}
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Username</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo.username}
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo.email}
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex justify-around">
        <Link
          to={"/update-user"}
          state={userInfo}
          className="font-medium rounded border-solid bg-green flex justify-center items-center p-3"
        >
          {" "}
          Update informations{" "}
        </Link>
        <button
          className="font-medium rounded border-solid bg-green flex justify-center items-center p-3"
          onClick={handleLogout}
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
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
