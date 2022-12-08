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

  const getData = (id) => {
    requests.getProductInfo(id, (data) => {
      setCurrent(data);
      requests.getMetadata(id, (metrics) => {
        setMetadata(metrics);
        setStars(calculateAverageStars(metrics.ratings));
      });
    });
  };

  useEffect(() => {
    requests.getProducts((data) => {
      getData(data[0].id);
    });
  }, []);

  return (
    <>
      <h1 className={global.h1}>Atelier</h1>
      <Overview
        current={current}
        currentStyles={currentStyles}
        setCurrentStyles={setCurrentStyles}
      />
      {current && (
      <RelatedOutfit
        current={current}
        favorites={favorites}
        setFavorites={setFavorites}
        CurMeta={metadata}
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
