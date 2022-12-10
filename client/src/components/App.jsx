import React, { useState, useEffect, useRef } from 'react';
import Overview from './Overview/Overview.jsx';
import RelatedOutfit from './RelatedOutfit/Index.jsx';
import RatingsReviews from './RatingsReviews/Index.jsx';
import requests from '../requests.js';
// import testData from '../testData.jsx'; // uncomment if needed
import global from '../styles/global.css'; // Applies global styles to entire App (not just App.jsx)
import { setCookie, getCookie } from '../util';

function App() {
  const [favorites, setFavorites] = useState(getCookie('amorey_favs') || []);
  // All states below are for the CURRENT product (the one displayed in Overview)
  const [current, setCurrent] = useState({ features: [] });
  const [currentStyles, setCurrentStyles] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [stars, setStars] = useState(5);

  const ratingsReviewsRef = useRef(null);

  const calculateAverageStars = (ratings) => {
    let totalStars = 0;
    let ratingsCount = 0;

    Object.keys(ratings).forEach((key) => {
      totalStars += key * ratings[key];
      ratingsCount += Number(ratings[key]);
    });
    const average = totalStars / ratingsCount;
    return (Math.round(average * 4) / 4).toFixed(2);
  };

  const setCurrentStylesMeta = (id) => {
    requests.getStyles(id, (styleData) => {
      setCurrentStyles(styleData.results);
    });
    requests.getMetadata(id, (metrics) => {
      setMetadata(metrics);
      setStars(calculateAverageStars(metrics.ratings));
    });
  };

  const getProductData = (id) => {
    requests.getProductInfo(id, (data) => {
      setCurrent(data);
      setCurrentStylesMeta(id);
    });
  };

  // on app load, get the basic product data from the API
  // Then, pass first product to getProductData which gets the product metadata & styles
  useEffect(() => {
    requests.getProducts((data) => {
      getProductData(data[0].id);
    });
  }, []);

  // if current product changes, get new current product's styles & metadata from the API
  useEffect(() => {
    if (current && current.id) {
      setCurrentStylesMeta(current.id);
    }
  }, [current]);

  // if favorites change, save favorites to cookie on client
  useEffect(() => {
    setCookie('amorey_favs', favorites);
  }, [favorites]);

  return (
    <>
      <h1 className={global.h1}>Amorey</h1>
      <Overview
        current={current}
        currentStyles={currentStyles}
        stars={stars}
        ref={ratingsReviewsRef}
      />
      {currentStyles.length && (
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
      )}
      {current.id && (
      <RatingsReviews
        current={current}
        metadata={metadata}
        stars={stars}
        ref={ratingsReviewsRef}
      />
      )}
    </>
  );
}

export default App;
