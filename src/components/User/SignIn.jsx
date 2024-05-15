import React, { useState } from "react";

import Welcome from "../Message/Welcome";
import Error from "../Message/Error";

import { Link } from "react-router-dom";
import { sign } from "../../services/authService";
import { saveToken } from "../../services/tokenService";
import { useAuth } from "../../context/AuthContext";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
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
    const response = await sign("frontoffice/login", formData);
    if (response.message === "Connexion réussie") {
      // Si l'utilisateur a été crée avec succès, on enregistre le token utilisateur dans la session du navigateur
      saveToken(response.token);
      // Puis on vide et masque le message d'erreur
      setMessage("");
      // Puis on enregistre les informations utilisateurs dans le contexte (on en aura besoin pour afficher les informations de l'utilisateur, et de gerer l'accès au backoffice via le role)
      setUserData({
        ...userData,
        username: response.username,
        role: response.role,
      });
      // Ensuite on vide les informations utilisateurs de l'état de React
      setFormData({
        ...formData,
        username: "",
        password: "",
      });
      // Puis on passe le boolen isLogged à true
      setIsLogged(true);
    } else if (response === "Invalid username or password") {
      setMessage(response);
    }
  };

  return (
    <div className="Login">
      {isLogged ? (
        <Welcome />
      ) : (
        <section>
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[calc(100vh-129px)]">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
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
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      class="font-medium w-32 h-11 rounded flex border-solid justify-center place-items-center bg-green"
                    >
                      Sign in
                    </button>
                  </div>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <Link to="/signup">Sign up</Link>
                  </p>
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

export default SignIn;
