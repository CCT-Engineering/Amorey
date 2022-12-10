import React, { useState, useEffect } from 'react';
import Sorting from './Sorting.jsx';
import ReviewEntry from './ReviewEntry.jsx';
import NewReview from './NewReview/NewReview.jsx';
import date from '../../util/formatDate.js';
import local from '../../styles/RatingsReviews/ReviewList.css';

const ReviewsList = ({
  reviews, sort, newSort, changeSearch, update, current, details, renderReviews,
}) => {
  const [renderLimit, setRenderLimit] = useState(2);
  const [filters, setFilters] = useState([]);
  const [query, setQuery] = useState('');
  const [modal, showModal] = useState(false);
  let renderAmount = 0;

  const filterReviews = (searched = [], filtered = []) => {
    reviews.forEach((review) => {
      if (query.length >= 3) {
        if (review.reviewer_name.toLowerCase().includes(query.toLowerCase())
        || date(review.date).toLowerCase().includes(query.toLowerCase())
        || review.summary.toLowerCase().includes(query.toLowerCase())
        || review.body.toLowerCase().includes(query.toLowerCase())
        || (review.recommend && '✓ i recommend this product'.includes(query.toLowerCase()))
        || (review.response && review.response.toLowerCase().includes(query.toLowerCase()))
        || String(review.helpfulness).includes(query.toLowerCase())) {
          searched.push(review);
        }
      } else {
        searched.push(review);
      }
    });
    if (!sort.includes(1)) {
      setFilters(searched);
    } else {
      searched.forEach((review) => sort[review.rating - 1] && filtered.push(review));
      setFilters(filtered);
    }
  };

  const loadMoreEntries = () => {
    event.preventDefault();
    if (renderLimit + 2 <= reviews.length) {
      setRenderLimit(renderLimit + 2);
    } else if (renderLimit < reviews.length) {
      setRenderLimit(reviews.length);
    }
  };

  const renderReviewEntries = (review, index) => {
    if (renderAmount < renderLimit) {
      renderAmount += 1;
      return <ReviewEntry review={review} key={index} update={update} />;
    }
    return null;
  };

  useEffect(() => filterReviews(), [reviews, sort, query]);

  return (
    <>
      <Sorting
        sort={sort}
        newSort={newSort}
        reviews={filters}
        changeSearch={changeSearch}
        query={query}
        setQuery={setQuery}
      />
      <div className={local.reviewList}>
        {filters && filters.map((review, index) => renderReviewEntries(review, index))}
        {!filters.length && <div>Currently No Reviews To Display</div>}
      </div>
      {filters.length > 2 && renderAmount < filters.length && (
        <button className={local.moreReviews} type="button" onClick={loadMoreEntries}>MORE REVIEWS</button>)}
      <button className={local.addReview} type="button" onClick={() => showModal(true)}>ADD A REVIEW +</button>
      {modal && (
        <NewReview
          current={current}
          details={details}
          renderReviews={renderReviews}
          showModal={showModal}
        />
      )}
    </>
  );
};

export default ReviewsList;
