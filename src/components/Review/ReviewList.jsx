import React from "react";
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import Success from "../Message/Success";
import { fetchReviewList } from "../../services/reviewService";

const ReviewList = ({ service, serviceId }) => {
  const [reviewList, setReviewList] = useState([]);

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

  return (
    <div className="flex justify-center items-center mb-8">
      <div className="md:w-3/5 w-3/4 flex flex-col gap-2 p-8 bg-gray-800 text-white border rounded">
        <h1 className="pb-5 text-lg text-center">Reviews</h1>
        <div className="overflow-y-auto max-h-96 border-2 border rounded">
          {reviewList.map((review, index) => (
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 bg-gray-700 m-4 p-4">
                <div className="flex justify justify-between">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 text-center rounded-full bg-red-500">
                    {review.username.charAt(0)}
                    </div>
                    <span>{review.username}</span>
                  </div>
                </div>
                <div>
                {review.content}
                </div>
                <div className="flex justify-between">
                  <span>{format(new Date(review.published_date), "yyyy/MM/dd 'at' hh:mm")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
