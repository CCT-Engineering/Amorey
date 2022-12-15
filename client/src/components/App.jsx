import React, { useState, useEffect, useRef } from 'react';
import Banner from './Banner/Banner.jsx';
import Overview from './Overview/Overview.jsx';
import RelatedOutfit from './RelatedOutfit/Index.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import requests from '../requests.js';
import calculateAverageStars from '../util/calculateStarAverage.js';
import local from '../styles/App.css';
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
  const [darkMode, setDarkMode] = useState(false);
  const ratingsReviewsRef = useRef(null);

  const getReviews = (sortMethod = order) => {
    requests.getReviews(current.id, sortMethod, (data) => {
      setReviews(data.results);
    });
  };

  // on app load, get the basic product data from the A
  useEffect(() => {
    requests.getProducts((data) => {
      requests.getProductInfo(data[0].id, (info) => {
        setCurrent(info);
      });
      requests.getStyles(data[0].id, (styleData) => {
        setCurrentStyles(styleData.results);
      });
      requests.getMetadata(data[0].id, (metrics) => {
        setMetadata(metrics);
        setStars(calculateAverageStars(metrics.ratings));
      });
    });
  }, []);

  // if current product changes, get new current product's styles & metadata from the API
  useEffect(() => {
    if (current.id) {
      getReviews(current.id);
    }
  }, [current.id]);

  // if favorites change, save favorites to cookie on client
  useEffect(() => {
    setCookie(FAVS_COOKIE, favorites);
  }, [favorites]);

  return (
    <div className={darkMode ? local.bodyDark : local.body}>
      <Banner darkMode={darkMode} setDarkMode={setDarkMode} />
      <Overview
        current={current}
        currentStyles={currentStyles}
        stars={stars}
        favorites={favorites}
        setFavorites={setFavorites}
        reviewsQty={reviews.length}
        darkMode={darkMode}
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
        setCurStars={setStars}
        calculateAverageStars={calculateAverageStars}
        setMetadata={setMetadata}
        darkMode={darkMode}
        setCurrentStyles={setCurrentStyles}
      />
      <RatingsReviews
        current={current}
        metadata={metadata}
        reviews={reviews}
        getReviews={getReviews}
        stars={stars}
        setOrder={setOrder}
        darkMode={darkMode}
        ref={ratingsReviewsRef}
      />
    </div>
  );
}

export default App;
