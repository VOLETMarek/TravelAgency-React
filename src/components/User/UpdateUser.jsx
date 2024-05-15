import React, { useState } from "react";

import Success from "../Message/Success";
import Error from "../Message/Error";

import { useLocation } from "react-router-dom";

import { signWithToken } from "../../services/authService";

function UpdateUser() {
  let location = useLocation();
  const { state } = location;

  const [formData, setFormData] = useState({
    lastname: state.lastname,
    firstname: state.firstname,
    username: state.username,
    email: state.email,
  });

  const [message, setMessage] = useState({ error: "", success: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await signWithToken("frontoffice/update", formData);
    if (response.message === "Utilisateur modifié avec succès") {
      // Puis on vide et masque le message d'erreur, et on ajoute le message de succès
      setMessage({
        ...message,
        error: "",
        success: "Modifications effectuées",
      });
      // Ensuite on vide les informations utilisateurs de l'état de React
      setFormData({
        ...formData,
        lastname: "",
        firstname: "",
        username: "",
        email: "",
      });
    } else if (
      response ===
      "Une erreur s'est produite lors de la modification de l'utilisateur"
    ) {
      setMessage({
        ...message,
        error: "Erreur de modification",
        success: "",
      });
    }
  };

  return (
    <div>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-129px)]">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="font-medium w-32 h-11 rounded flex border-solid justify-center place-items-center bg-green"
                  >
                    Submit
                  </button>
                </div>
                {message.error !== "" && <Error message={message.error} />}
                {message.success !== "" && <Success message={message.success} />}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UpdateUser;
