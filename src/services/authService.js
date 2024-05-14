import axios from "axios";

export const signUp = async (endpoint, userData) => {
  try {
    const response = await axios.post(`http://localhost:5000/${endpoint}`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Erreur lors de la récupération des articles :", error);
    return [];
  }
};
