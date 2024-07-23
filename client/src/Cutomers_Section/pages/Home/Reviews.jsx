import "./home.css";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import icon from "../../../assets/react.svg";
import Title from "../../compnents/Title";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";
const Reviews = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await axios.get(
        `${VITE_API_URL_BASE}/customer/review/all`,
        {
          withCredentials: true,
        },
      ).catch(error => console.log(error))
      console.log("reviews", reviews);
      setReviews(reviews.data.data);
    };

    getReviews();
  }, []);
  return (
    <div>
      <Title title={"Reviews"} />

      <div className="reviews_sect">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, key) => (
            <div className="review">
              <div className="reviewer_details" key={key}>
                <div className="rv_img">
                  <img src={icon} alt="" />
                </div>
                <div className="reviewer">
                  <h2>{review.customerName}</h2>
                  <div className="ratings">
                    <p>({review.reviewRating})</p>
                    <div>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="comment">
                <p>{review.reviewComment}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading reviews ...</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
