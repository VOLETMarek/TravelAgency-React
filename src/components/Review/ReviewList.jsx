import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Success from "../Message/Success";
import { fetchReviewList } from "../../services/reviewService";
import { sendReview } from "../../services/reviewService";
import { useAuth } from "../../context/AuthContext";

const ReviewList = ({ service, serviceId }) => {
  const [reviewList, setReviewList] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [message, setMessage] = useState("");
  const { isLogged, setIsLogged } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetchReviewList(
        `frontoffice/${service}-reviews`,
        serviceId
      );
      setReviewList(response);
    };
    fetchReviews();
  }, []);

  const handleChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      content: reviewText,
      [service + "_id"]: serviceId,
    };
    const response = await sendReview(`frontoffice/${service}`, data);
    setReviewText("");
    // On affiche le message de succès d'insertion
    setMessage(response.message);
    // Effacer le message après 2 secondes
    setTimeout(() => {
      setMessage("");
    }, 2000);
    // On rafraichi la liste des commentaires pour afficher le commentaire qui vient d'etre inséré dans la liste
    const newReviewList = await fetchReviewList(
      `frontoffice/${service}-reviews`,
      serviceId
    );
    setReviewList(newReviewList);
  };

  return (
    <div className="flex justify-center items-center pb-8 border-t border-black">
      <div className="md:w-3/5 w-3/4 flex flex-col gap-2 p-8">
      <h2 className="text-center text-black text-3xl font-bold mb-4">
      ✏️&nbsp; Reviews &nbsp;✏️
      </h2>
        <div className="overflow-y-auto max-h-96 border-2 border rounded">
          {reviewList.map((review, index) => (
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 item m-4 p-4 border rounded-3xl">
                <div className="flex justify justify-between">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 text-center rounded-full bg-red-500">
                      {review.username.charAt(0)}
                    </div>
                    <span>{review.username}</span>
                  </div>
                </div>
                <div>{review.content}</div>
                <div className="flex justify-between">
                  <span>
                    {format(
                      new Date(review.published_date),
                      "yyyy/MM/dd 'at' hh:mm"
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isLogged ? (
          <>
            <form className="flex gap-2 mt-8" onSubmit={handleSubmit}>
              <input
                id="default-input"
                name="content"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:focus:ring-green-500 dark:focus:border-green-500 outline-none"
                onChange={handleChange}
                value={reviewText}
              />
              <button
                type="submit"
                class="w-40 h-11 rounded flex border-solid mx-2 justify-center place-items-center text-black mx-auto bg-green"
              >
                Send
              </button>
            </form>
            {message && <Success message={message} />}
          </>
        ) : (
          <div className="flex justify-center">
          <Link to="/signin" className="font-medium rounded flex border-solid bg-green text-black text-center p-3 mt-4">Login to comment</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
