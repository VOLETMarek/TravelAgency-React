import axios from "axios";

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`http://localhost:5000/${endpoint}`);
    return response.data;
  } catch (error) {
    console.log("Erreur lors de la récupération des données :", error);
    return [];
  }
};
