import React, {useState, useEffect} from 'react';
import Overview from './Overview/Overview.jsx';
import RelatedOutfit from './RelatedOutfit/Index.jsx';
import RatingsReviews from './RatingsReviews/Index.jsx';
import requests from '../requests.js'
import testData from '../testData.jsx';
import global from '../styles/global.css'; // Applies global styles to entire App (not just App.jsx)

const App = () => {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState({});
  const [metadata, setMetadata] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    requests.getProducts((data) => {
      setProducts(data);
      setCurrent(data[0]);
      requests.getMetadata(data[0].id, (data) => {
        setMetadata(data);
      });
    });
  }, []);

  // console.log(products);
  // console.log(current);
  // console.log(metadata);

  return (
    <div>
      <h1>Atelier</h1>
      <Overview/>
      <RelatedOutfit/>
      <RatingsReviews/>
    </div>
  );
}

export default App;