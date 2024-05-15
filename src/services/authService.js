import axios from "axios";
import { getToken } from "../services/tokenService";

export const sign = async (endpoint, userData) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/${endpoint}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des données utilisateurs :",
      error
    );
    return error.response.data.message;
  }
};

export const signWithToken = async (endpoint, userData) => {
  try {
    const token = getToken();
    console.log(token)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
      },
    };
    const response = await axios.post(
      `http://localhost:5000/${endpoint}`,
      userData,
      config 
    );
    return response.data;
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des données utilisateurs :",
      error
    );
    return error.response.data.message;
  }
};
