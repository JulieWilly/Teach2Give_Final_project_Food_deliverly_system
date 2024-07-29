import React, { useEffect, useState } from "react";
import "./reviewers.css";
import img from "../../../assets/react.svg";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import Add_products from "../Products/Add_products";

const Reviewers = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [review, setReview] = useState([]);

  // REJECT REVIEW
  const handleReviewReject = async (review_id) => {
    await axios.delete(`${VITE_API_URL_BASE}/customer/review/${review_id}`, {
      withCredentials: true,
    });
    alert("deleted successfully.");
  };
  useEffect(() => {
    const getReviews = async () => {
      try {
        setError(false);
        setLoading(true);
        const reviews = await axios
          .get(`${VITE_API_URL_BASE}/customer/review/all`, {
            withCredentials: true,
          })
          .catch((error) => console.log(error));
        console.log("reviews", reviews);
        setReview(reviews.data.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, []);
  return (
    <div className="reviews_sect ">
      {review.length > 0 ? (
        review.map((reviews, key) => (
          <div className="customer reviews" key={key}>
            <div className="cust_img">
              <img src={img} alt="reviewers image" />
            </div>
            <div className="cust_details">
              <h2>{reviews.customerName}</h2>
              <p>{reviews.reviewComment}</p>
              <div className="ratings">
                <p>({reviews.reviewRating})</p>
                <div>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button onClick={() => handleReviewReject(reviews.review_id)}>
                Reject Review
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading reviews</p>
      )}
    </div>
  );
};

export default Reviewers;
