import React, { useState, useEffect, useRef } from 'react';
import Overview from './Overview/Overview.jsx';
import RelatedOutfit from './RelatedOutfit/Index.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import requests from '../requests.js';
import calculateAverageStars from '../util/calculateStarAverage.js';
// import testData from '../testData.jsx'; // uncomment if needed
import global from '../styles/global.css';
import { setCookie, getCookie } from '../util';

const FAVS_COOKIE = 'amorey_favs';

function App() {
  const [favorites, setFavorites] = useState(getCookie(FAVS_COOKIE) || []);
  // All states below are for the CURRENT product (the one displayed in Overview)
  const [current, setCurrent] = useState({ features: [] });
  const [currentStyles, setCurrentStyles] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [order, setOrder] = useState('relevant');
  const ratingsReviewsRef = useRef(null);

  const getReviews = (sortMethod = order) => {
    requests.getReviews(current.id, sortMethod, (data) => {
      setReviews(data.results);
    });
  };

  const getCurStylesMetaRev = (id) => {
    requests.getStyles(id, (styleData) => {
      setCurrentStyles(styleData.results);
    });
    requests.getMetadata(id, (metrics) => {
      setMetadata(metrics);
      setStars(calculateAverageStars(metrics.ratings));
    });
    requests.getReviews(id, order, (data) => {
      setReviews(data.results);
    });
  };

  const getProductData = (id) => {
    requests.getProductInfo(id, (data) => {
      setCurrent(data);
    });
  };

  // on app load, get the basic product data from the API
  // Then, pass 1st product to getProductData which gets product metadata, styles, & reviews
  useEffect(() => {
    requests.getProducts((data) => {
      getProductData(data[0].id);
    });
  }, []);

  // if current product changes, get new current product's styles & metadata from the API
  useEffect(() => {
    if (current.id) {
      getCurStylesMetaRev(current.id);
    }
  }, [current]);

  // if favorites change, save favorites to cookie on client
  useEffect(() => {
    setCookie(FAVS_COOKIE, favorites);
  }, [favorites]);

  return (
    <>
      <div className={global.logo} role="img" alt="AMOREY" name="logo" />
      <Overview
        current={current}
        currentStyles={currentStyles}
        stars={stars}
        favorites={favorites}
        setFavorites={setFavorites}
        reviewsQty={reviews.length}
        ref={ratingsReviewsRef}
      />
      <RelatedOutfit
        current={current}
        favorites={favorites}
        setFavorites={setFavorites}
        CurMeta={metadata}
        setCurrent={setCurrent}
        currentStyles={currentStyles}
        stars={stars}
        setStars={setStars}
        calculateAverageStars={calculateAverageStars}
        setMetadata={setMetadata}
      />
      <RatingsReviews
        current={current}
        metadata={metadata}
        reviews={reviews}
        getReviews={getReviews}
        stars={stars}
        setOrder={setOrder}
        ref={ratingsReviewsRef}
      />
    </>
  );
}

export default App;
