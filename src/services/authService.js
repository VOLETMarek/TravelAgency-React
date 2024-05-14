import axios from "axios";

export const sign = async (endpoint, userData) => {
  try {
    const response = await axios.post(`http://localhost:5000/${endpoint}`, userData);
    return response.data;
  } catch (error) {
    console.log("Erreur lors de la récupération des données utilisateurs :", error);
    return error.response.data.message;
  }
};
