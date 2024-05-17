import axios from "axios";
import { getToken } from "../services/tokenService";

export const fetchReviewList = async (endpoint, serviceId) => {
  try {
    const response = await axios.get(`http://localhost:5000/${endpoint}/${serviceId}`);
    return response.data;
  } catch (error) {
    console.log("Erreur lors de la récupération des commentaires :", error);
    return [];
  }
};

export const sendReview = async (endpoint, data) => {
  console.log(data)

  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };
    const response = await axios.post(`http://localhost:5000/${endpoint}-review`, data, config);
    return response.data;
  } catch (error) {
    console.log("Erreur lors de l'insertion du commentaire :", error);
    return [];
  }
};