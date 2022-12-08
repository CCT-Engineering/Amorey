import React, { useState, useEffect } from 'react';
import Overview from './Overview/Overview.jsx';
import RelatedOutfit from './RelatedOutfit/Index.jsx';
import RatingsReviews from './RatingsReviews/Index.jsx';
import requests from '../requests.js';
// import testData from '../testData.jsx'; // uncomment if needed
import global from '../styles/global.css'; // Applies global styles to entire App (not just App.jsx)

function App() {
  const [current, setCurrent] = useState({ features: [] });
  const [currentStyles, setCurrentStyles] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [stars, setStars] = useState(5);
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

  return (
    <>
      <h1 className={global.h1}>Atelier</h1>
      <Overview
        current={current}
        currentStyles={currentStyles}
      />
      {current && (
      <RelatedOutfit
        current={current}
        favorites={favorites}
        setFavorites={setFavorites}
        CurMeta={metadata}
        setCurrent={setCurrent}
        currentStyles={currentStyles}
      />
      )}
      {current.id && (
      <RatingsReviews
        currentId={current.id}
        metadata={metadata}
        stars={stars}
      />
      )}
    </>
  );
}

export default App;
