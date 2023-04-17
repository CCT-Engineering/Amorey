import React, { useState, useEffect, useRef } from 'react';
import Banner from './Banner/Banner.jsx';
import Overview from './Overview/Overview.jsx';
import RelatedOutfit from './RelatedOutfit/Index.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import requests from '../requests.js';
import calculateAverageStars from '../util/calculateStarAverage.js';
import local from '../styles/App.css';
import { setCookie, getCookie } from '../util';

const FAVS_COOKIE = 'amorey_favs';

function App() {
  const [favorites, setFavorites] = useState(getCookie(FAVS_COOKIE) || []);
  // All states below are for the CURRENT product (the one displayed in Overview)
  // const [current, setCurrent] = useState({ features: [] });
  // TEMP LINE BELOW! REMOVE ME AND UNCOMMENT LINE ABOVE!
  const [current, setCurrent] = useState({ features: [], id: 1 });
  const [currentStyles, setCurrentStyles] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [order, setOrder] = useState('relevant');
  const [darkMode, setDarkMode] = useState(false);
  const [relateArr, setRelatedArr] = useState([]);
  const ratingsReviewsRef = useRef(null);

  const getReviews = (sortMethod = order) => {
    requests.getReviews(current.id, sortMethod, (data) => {
      setReviews(data.results);
    });
  };

  const getQuestions = () => {
    requests.getQuestions(current.id, (data) => {
      setQuestions(data.results);
      console.log('data.results:', data.results.slice(0, 5));
    });
  };

  const getRelated = () => {
    requests.getRelated(current.id, (data) => {
      const unique = [...new Set(data)];
      const temp = unique.filter((item) => {
        return item !== current.id;
      });
      setRelatedArr(temp);
    });
  };

  const getStylesMetadata = (productID) => {
    requests.getStyles(productID, (styleData) => {
      setCurrentStyles(styleData.results);
    });
    requests.getMetadata(productID, (metrics) => {
      setMetadata(metrics);
      setStars(calculateAverageStars(metrics.ratings));
    });
  };

  // on app load, get product data, then get styles and metadata
  useEffect(() => {
    requests.getProducts((products) => {
      const productID = products[0].id;
      requests.getProductInfo(productID, (info) => {
        setCurrent(info);
      });
      getStylesMetadata(productID);
    }, process.env.STARTING_PRODUCT_IDX ?? 1);
  }, []);

  // if current product changes, get related products, current reviews, questions, & metadata
  useEffect(() => {
    if (current.id) {
      getStylesMetadata(current.id);
      getRelated();
      getReviews();
      getQuestions();
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
        relateArr={relateArr}
      />
      <QuestionsAnswers
        current={current}
        questions={questions}
        getQuestions={getQuestions}
        darkMode={darkMode}
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
