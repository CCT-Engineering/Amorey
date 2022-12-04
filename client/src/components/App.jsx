import React, {useState, useEffect} from 'react';
import Overview from './Overview/Overview.jsx';
import RelatedOutfit from './RelatedOutfit/Index.jsx';
import RatingsReviews from './RatingsReviews/Index.jsx';
import requests from '../requests.js';
import testData from '../testData.jsx';
import global from '../styles/global.css'; // Applies global styles to entire App (not just App.jsx)

const App = () => {
  const [current, setCurrent] = useState({});
  const [metadata, setMetadata] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [stars, setStars] = useState(5);

  useEffect(() => {
    requests.getProducts((data) => {
      getData(data[0].id)
    });
  }, []);

  const getData = (id) => {
    requests.getProductInfo(id, (data) => {
      setCurrent(data);
      requests.getMetadata(id, (data) => {
        setMetadata(data);
        setStars(calculateAverageStars(data.ratings))
      });
    });
  };

  const calculateAverageStars = (ratings) => {
    let totalStars = 0
    let ratingsCount = 0;

    for (const key in ratings) {
      totalStars += key * ratings[key];
      ratingsCount += Number(ratings[key]);
    }
    const average = totalStars / ratingsCount;
    return (Math.round(average * 4) / 4).toFixed(2)
  };

  return (
    <div>
      <h1>Atelier</h1>
      <Overview current={current} />
      <RelatedOutfit/>
      {current.id ? <RatingsReviews currentId={current.id} metadata={metadata} stars={stars}/> : <div></div>}
    </div>
  );
}

export default App;