import axios from "axios";

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`http://localhost:5000/${endpoint}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Erreur lors de la récupération des articles :", error);
    return [];
  }
};
