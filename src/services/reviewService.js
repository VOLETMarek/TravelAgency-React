import axios from "axios";

export const fetchReviewList = async (endpoint, serviceId) => {
  try {
    const response = await axios.get(`http://localhost:5000/${endpoint}/${serviceId}`);
    return response.data;
  } catch (error) {
    console.log("Erreur lors de la récupération des commentaires :", error);
    return [];
  }
};
