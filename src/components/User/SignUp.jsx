import React, { useState } from "react";

import Welcome from "../Message/Welcome";
import Error from "../Message/Error";

import { useAuth } from "../../context/AuthContext";
import { sign } from "../../services/authService";
import { saveToken } from "../../services/tokenService";

function SignUp() {
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const { isLogged, setIsLogged } = useAuth();
  const { userData, setUserData } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await sign("frontoffice/signin", formData);
    if (response.message === "Utilisateur enregistré avec succès") {
      // Si l'utilisateur a été crée avec succès, on enregistre le token utilisateur dans la session du navigateur
      saveToken(response.token);
      // Puis on vide et masque le message d'erreur
      setMessage("");
      // Puis on enregistre les informations utilisateurs dans le contexte (on en aura besoin pour afficher les informations de l'utilisateur, et de gerer l'accès au backoffice via le role)
      setUserData({
        ...userData,
        username: formData.username,
        role: "user",
      });
      // Ensuite on vide les informations utilisateurs de l'état de React
      setFormData({
        ...formData,
        lastname: "",
        firstname: "",
        username: "",
        email: "",
        password: "",
      });
      // Puis on passe le boolen isLogged à true
      setIsLogged(true);
    } else if (
      response === "Password not strong enough" ||
      response === "Invalid Email"
    ) {
      setMessage(response);
    }
  };

  return (
    <div>
      {isLogged ? (
        <Welcome />
      ) : (
        <section>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-129px)]">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      for="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your lastname
                    </label>
                    <input
                      type="lastname"
                      name="lastname"
                      id="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="lastname"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="firstname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your firstname
                    </label>
                    <input
                      type="firstname"
                      name="firstname"
                      id="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="firstname"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your username
                    </label>
                    <input
                      type="username"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="username"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="font-medium w-32 h-11 rounded flex border-solid justify-center place-items-center bg-green"
                    >
                      Register
                    </button>
                  </div>
                  {message !== "" && <Error message={message} />}
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default SignUp;
